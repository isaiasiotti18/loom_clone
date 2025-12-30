import VideoPlayer from "@/components/VideoPlayer";
import { getVideoById } from "@/lib/actions/video";
import { redirect } from "next/navigation";

const Page = async ({ params }: Params) => {
  const { videoId } = await params;

  console.log("Video ID:", videoId);

  const result = await getVideoById(videoId);

  const { user, video } = result;

  console.log("Video Page User:", user);
  console.log("Video Page Video:", video);

  //if (!video) redirect("/404");

  return (
    <main className="wrapper page">
      <h1 className="text-2xl">{video.title}</h1>
      <section className="video-details">
        <div className="content">
          <VideoPlayer videoId={video.id} />
        </div>
      </section>
    </main>
  );
};

export default Page;
