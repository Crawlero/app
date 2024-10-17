import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  return prisma.crawler.findMany({
    select: {
      name: true,
      url: true,
      id: true,
    },
  });
});
