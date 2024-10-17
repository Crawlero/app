import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return prisma.crawler.create({
    data: {
      ...body,
      userId: 1, // TODO: replace with actual user id
    },
  });
});
