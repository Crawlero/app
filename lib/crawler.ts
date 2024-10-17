import type { CrawlerSchema } from "./types/crawler";

export function parseCrawlerSchema(schemaStr?: string): CrawlerSchema {
  const schema: CrawlerSchema = {
    baseSelector: "",
    name: "",
    fields: [],
  };

  if (!schemaStr) {
    return schema;
  }

  try {
    const parsed = JSON.parse(schemaStr);

    if (parsed) {
      schema.baseSelector = parsed.baseSelector;
      schema.name = parsed.name;
      schema.fields = parsed.fields;
    }
  } catch (error) {
    console.error("Error parsing schema:", error);
  }

  return schema;
}

