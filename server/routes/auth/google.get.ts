import prisma from "~/lib/prisma";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    const persistedUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        name: user.name,
      },
    });

    await setUserSession(event, {
      user: {
        id: persistedUser.id,
        email: persistedUser.email,
        name: persistedUser.name || "No name",
      },
    });

    return sendRedirect(event, "/console");
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("Google OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
