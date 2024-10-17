import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  if (!id || isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID should be an integer",
    });
  }

  const restult = await prisma.crawler.update({
    where: { id: Number(id) },
    data: body,
  });

  return restult;
});
