export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id || isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID should be an integer",
    });
  }

  const db = hubDatabase()

  const result = await db.prepare("SELECT * FROM crawler WHERE id = ?").bind(Number(id)).first();

  if (!result) {
    throw createError({
      statusCode: 404,
      statusMessage: "Crawler not found",
    });
  }

  return result;
});
