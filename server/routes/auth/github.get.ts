export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user }) {
    const db = hubDatabase();

    let existingUser = await db
      .prepare("SELECT * FROM user WHERE email = ?1")
      .bind(user.email)
      .first();

    if (!existingUser) {
      await db
        .prepare("INSERT INTO user (email, name) VALUES (?1, ?2)")
        .bind(user.email, user.name)
        .run();

      existingUser = await db
        .prepare("SELECT * FROM user WHERE email = ?1")
        .bind(user.email)
        .first();

      if (!existingUser) {
        throw new Error("Could not create user");
      }
    }

    await setUserSession(event, {
      user: {
        id: existingUser.id as number,
        email: existingUser.email as string,
        name: existingUser.name as string,
      },
    });
    return sendRedirect(event, "/console");
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
