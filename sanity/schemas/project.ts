import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL path for this project (e.g. open-your-eyes)",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls sort position on the home page grid (1 = first)",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'e.g. "Nairobi, Kenya"',
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: 'e.g. "Director, Camera Operator, Editor"',
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      description: "Card image on the home page grid",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe this image for accessibility and SEO",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      description: "Large image at top of the case study page",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      description: "Shown on the home page card (max 200 characters)",
      validation: (rule) => rule.max(200),
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Full Description",
      type: "array",
      description: "The full case study write-up (supports rich text)",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) =>
                      rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "videoLinks",
      title: "Video Links",
      type: "array",
      description: "Links to video content (YouTube, Vimeo, etc.)",
      of: [
        {
          type: "object",
          name: "videoLink",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "pressLinks",
      title: "Press Links",
      type: "array",
      description: "Links to press coverage or articles",
      of: [
        {
          type: "object",
          name: "pressLink",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "mediaGallery",
      title: "Media Gallery",
      type: "array",
      description: "BTS photos, stills, and additional video clips",
      of: [
        {
          type: "image",
          name: "galleryImage",
          title: "Image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
        {
          type: "object",
          name: "galleryVideo",
          title: "Video",
          fields: [
            defineField({
              name: "url",
              title: "Video URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "caption", subtitle: "url" },
            prepare({ title, subtitle }) {
              return {
                title: title || "Video",
                subtitle,
                media: undefined,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "thumbnail",
      order: "order",
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: order ? `${order}. ${title}` : title,
        subtitle,
        media,
      };
    },
  },
});
