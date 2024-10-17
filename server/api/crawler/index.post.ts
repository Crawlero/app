export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = hubDatabase();

  const newCrawler = await db
    .prepare(
      'INSERT INTO Crawler (name, description, userId) VALUES ("?1", "?2", ?3)',
    )
    .bind(body.name, body.description, 1)
    .run();

  return newCrawler;
});
