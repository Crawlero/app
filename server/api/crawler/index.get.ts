export default defineEventHandler(async (event) => {
  const db = hubDatabase();
  const result = await db.prepare("SELECT name, url, id FROM crawler").all();
  return result.results;
});
