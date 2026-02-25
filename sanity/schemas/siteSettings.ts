import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "contact", title: "Contact Info" },
    { name: "resume", title: "Resumé" },
  ],
  fields: [
    defineField({
      name: "heroVideoUrl",
      title: "Hero Video URL",
      type: "url",
      description: "YouTube or self-hosted MP4 URL for the looping hero background",
      group: "hero",
    }),
    defineField({
      name: "heroFallbackImage",
      title: "Hero Fallback Image",
      type: "image",
      description: "Shown while the video loads or if video is unavailable",
      options: { hotspot: true },
      group: "hero",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "editReelUrl",
      title: "Edit Reel URL",
      type: "url",
      description: 'Link for the "View Edit Reel" button on the home page',
      group: "hero",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      group: "contact",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'e.g. "Austin, TX & Worldwide"',
      group: "contact",
    }),
    defineField({
      name: "forennMusicUrl",
      title: "Forenn Music URL",
      type: "url",
      description: "Link to Forenn Music on the About page",
      group: "contact",
    }),
    defineField({
      name: "resumePdf",
      title: "Resumé PDF",
      type: "file",
      description: "Upload the current resumé — this replaces the static PDF",
      group: "resume",
      options: { accept: ".pdf" },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
