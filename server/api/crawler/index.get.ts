import { Crawler } from "~/pages/console/crawlers/index.vue";

export default defineEventHandler((event) => {
  const data: Crawler[] = [
    {
      id: "c1",
      name: "Crawler One",
      lastRun: "2023-10-01",
      runCount: 10,
      lastStatus: "success",
    },
    {
      id: "c2",
      name: "Crawler Two",
      lastRun: "2023-10-02",
      runCount: 5,
      lastStatus: "failed",
    },
  ];

  return {
    crawlers: data,
  };
});
