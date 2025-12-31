/* eslint-disable react-hooks/immutability */
import { useState, useRef, useEffect } from "react";
import {
  getMediaStreams,
  createAudioMixer,
  setupRecording,
  cleanupRecording,
  createRecordingBlob,
  calculateRecordingDuration,
} from "@/lib/utils";

export const useScreenRecording = () => {
  const [state, setState] = useState<BunnyRecordingState>({
    isRecording: false,
    recordedBlob: null,
    recordedVideoUrl: "",
    recordingDuration: 0,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<ExtendedMediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      stopRecording();
      if (state.recordedVideoUrl) {
        URL.revokeObjectURL(state.recordedVideoUrl);
      }

      if (audioContextRef.current?.state !== "closed") {
        audioContextRef.current?.close().catch(console.error);
      }

      audioContextRef.current = null;
    };
  }, [state.recordedVideoUrl]);

  const handleRecordingStop = () => {
    const { blob, url } = createRecordingBlob(chunksRef.current);
    const duration = calculateRecordingDuration(startTimeRef.current);

    setState({
      isRecording: false,
      recordedBlob: blob,
      recordedVideoUrl: url,
      recordingDuration: duration,
    });

    chunksRef.current = [];
    startTimeRef.current = null;
  };

  const startRecording = async (withMic = true) => {
    if (state.isRecording) return false;

    try {
      const { displayStream, micStream, hasDisplayAudio } =
        await getMediaStreams(withMic);

      const combinedStream = new MediaStream() as ExtendedMediaStream;

      // vídeo da tela
      displayStream
        .getVideoTracks()
        .forEach((track) => combinedStream.addTrack(track));

      // áudio (opcional e tolerante a falha)
      audioContextRef.current = new AudioContext();

      const audioDestination = createAudioMixer(
        audioContextRef.current,
        displayStream,
        micStream ?? null,
        hasDisplayAudio
      );

      audioDestination?.stream
        .getAudioTracks()
        .forEach((track) => combinedStream.addTrack(track));

      combinedStream._originalStreams = [
        displayStream,
        ...(micStream ? [micStream] : []),
      ];

      streamRef.current = combinedStream;

      mediaRecorderRef.current = setupRecording(combinedStream, {
        onDataAvailable: (e) => e.data.size && chunksRef.current.push(e.data),
        onStop: handleRecordingStop,
      });

      chunksRef.current = [];
      startTimeRef.current = Date.now();

      mediaRecorderRef.current.start(1000);

      setState((prev) => ({ ...prev, isRecording: true }));

      return true;
    } catch (error) {
      console.error("Recording error:", error);
      setState((prev) => ({ ...prev, isRecording: false }));
      return false;
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }

    cleanupRecording(
      mediaRecorderRef.current,
      streamRef.current,
      streamRef.current?._originalStreams
    );

    streamRef.current = null;
  };

  const resetRecording = () => {
    stopRecording();

    if (state.recordedVideoUrl) {
      URL.revokeObjectURL(state.recordedVideoUrl);
    }

    setState({
      isRecording: false,
      recordedBlob: null,
      recordedVideoUrl: "",
      recordingDuration: 0,
    });

    startTimeRef.current = null;
  };

  return {
    ...state,
    startRecording,
    stopRecording,
    resetRecording,
  };
};
