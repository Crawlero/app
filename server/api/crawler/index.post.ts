export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = hubDatabase();

  const newCrawler = await db
    .prepare(
      "INSERT INTO Crawler (name, description, userId, url, schema) VALUES (?1, ?2, ?3, ?4, ?5)",
    )
    .bind(
      body.name ?? "N/A",
      body.description ?? "Insert description here",
      1,
      "",
      "",
    )
    .run();

  if (newCrawler.error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Cannot create Crawler",
    });
  }

  return newCrawler;
});
