import { defineField, defineType } from "sanity";

const richTextBlock = {
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
            validation: (rule: any) =>
              rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
          },
        ],
      },
    ],
  },
};

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
          description: "Optional — falls back to the project title",
        }),
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      description: "Large banner at top of the case study page",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Optional — falls back to the project title",
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

    // ── Reorderable page sections ─────────────────────────────────────────
    defineField({
      name: "sections",
      title: "Page Content",
      description: "Drag to reorder. Add text, videos, links, or image galleries in any order.",
      type: "array",
      of: [
        {
          type: "object",
          name: "textSection",
          title: "Text Block",
          icon: () => "📝",
          fields: [
            defineField({
              name: "heading",
              title: "Heading (optional)",
              type: "string",
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "array",
              of: [richTextBlock],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "heading", content: "content" },
            prepare({ title, content }) {
              const plainText =
                content
                  ?.map((b: any) =>
                    b.children?.map((c: any) => c.text).join("")
                  )
                  .join(" ")
                  .slice(0, 80) ?? "";
              return {
                title: title || "Text Block",
                subtitle: plainText ? `${plainText}…` : "",
              };
            },
          },
        },
        {
          type: "object",
          name: "videoEmbed",
          title: "Video",
          icon: () => "🎬",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'e.g. "Trailer", "Full Film", "Episode 1"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              description: "YouTube or Vimeo link",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        },
        {
          type: "object",
          name: "linkList",
          title: "Links",
          icon: () => "🔗",
          fields: [
            defineField({
              name: "heading",
              title: "Heading (optional)",
              type: "string",
              description: 'e.g. "Press", "Awards"',
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "linkItem",
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
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: { heading: "heading", links: "links" },
            prepare({ heading, links }) {
              const count = links?.length ?? 0;
              return {
                title: heading || "Links",
                subtitle: `${count} link${count === 1 ? "" : "s"}`,
              };
            },
          },
        },
        {
          type: "object",
          name: "imageGallery",
          title: "Image Gallery",
          icon: () => "🖼️",
          fields: [
            defineField({
              name: "heading",
              title: "Heading (optional)",
              type: "string",
              description: 'e.g. "Behind the Scenes", "Stills"',
            }),
            defineField({
              name: "images",
              title: "Images",
              type: "array",
              of: [
                {
                  type: "image",
                  name: "galleryImage",
                  options: { hotspot: true },
                  fields: [
                    defineField({
                      name: "alt",
                      title: "Alt Text",
                      type: "string",
                      description: "Optional — falls back to project title + position",
                    }),
                    defineField({
                      name: "caption",
                      title: "Caption",
                      type: "string",
                    }),
                  ],
                },
              ],
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: { heading: "heading", images: "images" },
            prepare({ heading, images }) {
              const count = images?.length ?? 0;
              return {
                title: heading || "Image Gallery",
                subtitle: `${count} image${count === 1 ? "" : "s"}`,
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
