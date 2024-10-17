export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  if (!id || isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID should be an integer",
    });
  }

  const db = hubDatabase();

  const currentCrawler = await db
    .prepare("SELECT * FROM Crawler WHERE id = ?1")
    .bind(Number(id))
    .first();

  if (!currentCrawler) {
    throw createError({
      statusCode: 404,
      statusMessage: "Crawler not found",
    });
  }

  const result = await db
    .prepare(
      'UPDATE Crawler SET name = "?1", description = "?2", url = "?3", schema = "?4" WHERE id = ?5',
    )
    .bind(
      body.name || currentCrawler.name,
      body.description || currentCrawler.description,
      body.url || currentCrawler.url,
      body.schema || currentCrawler.schema,
      Number(id),
    )
    .run();

  return result;
});
