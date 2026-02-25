import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactSubmission",
  title: "Contact Submission",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "read",
      title: "Read",
      type: "boolean",
      description: "Mark as read once you've seen this",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      date: "submittedAt",
      read: "read",
    },
    prepare({ title, subtitle, date, read }) {
      const indicator = read ? "✓" : "●";
      const dateStr = date
        ? new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "";
      return {
        title: `${indicator} ${title || "Unknown"}`,
        subtitle: `${subtitle || ""} — ${dateStr}`,
      };
    },
  },
});
