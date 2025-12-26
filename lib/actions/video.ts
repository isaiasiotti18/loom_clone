"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { withErrorHandling } from "../utils";

// Helper Functions
const getSessionUserId = async (): Promise<string> => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) throw new Error("Unauthenticated");

  return session.user.id;
};

// Server Actions
export const getVideoUploadUrl = withErrorHandling(async () => {
  await getSessionUserId();
});
