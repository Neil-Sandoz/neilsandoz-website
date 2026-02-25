import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutContent",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: 'e.g. "Hey, I\'m Neil."',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "profilePhoto",
      title: "Profile Photo",
      type: "image",
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
      name: "bioBlocks",
      title: "Bio",
      type: "array",
      description: "Your full bio — supports rich text, links, etc.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
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
      name: "pullQuote",
      title: "Pull Quote",
      type: "text",
      description: "The highlighted quote displayed prominently on the About page",
      rows: 3,
    }),
    defineField({
      name: "pullQuoteSubtext",
      title: "Pull Quote Subtext",
      type: "text",
      description: "Small text below the pull quote (attribution, context, etc.)",
      rows: 2,
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
