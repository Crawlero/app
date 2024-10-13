import { FieldTypes, Scheme } from "~/lib/scheme";

export type CrawlerResponse = {
  crawler: {
    url: string;
    schema: Scheme;
  };
};

export default defineEventHandler((event) => {
  return {
    crawler: {
      url: "https://www.cnn.com/",
      schema: {
        name: "News Teaser Extractor",
        baseSelector: ".wide-tease-item__wrapper",
        fields: [
          {
            name: "category",
            selector: ".unibrow span[data-testid='unibrow-text']",
            type: FieldTypes.Text,
            fields: [],
          },
          {
            name: "headline",
            selector: ".wide-tease-item__headline",
            type: FieldTypes.Text,
            fields: [],
          },
          {
            name: "summary",
            selector: ".wide-tease-item__description",
            type: FieldTypes.Text,
            fields: [],
          },
          {
            name: "time",
            selector: "[data-testid='wide-tease-date']",
            type: FieldTypes.Text,
            fields: [],
          },
          {
            name: "image",
            type: FieldTypes.Nested,
            selector: "picture.teasePicture img",
            fields: [
              {
                name: "src",
                type: FieldTypes.Attribute,
                attribute: "src",
                fields: [],
              },
              {
                name: "alt",
                type: FieldTypes.Attribute,
                attribute: "alt",
                fields: [],
              },
            ],
          },
          {
            name: "link",
            selector: "a[href]",
            type: FieldTypes.Attribute,
            attribute: "href",
            fields: [],
          },
        ],
      },
    },
  };
});
