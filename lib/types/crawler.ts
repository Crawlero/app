export enum FieldTypes {
  Text = 'text',
  Attribute = 'attribute',
  Nested = 'nested',
}

export type Field = {
  name: string;
  type: FieldTypes;
  fields: Field[];
  selector?: string;
  attribute?: string;
}

export type CrawlerSchema = {
  name: string;
  baseSelector: string;
  fields: Field[];
}
