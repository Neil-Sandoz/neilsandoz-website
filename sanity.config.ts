"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { structure, singletonActions, singletonTypes } from "./sanity/deskStructure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "neil-sandoz-studio",
  title: "Neil Sandoz",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
  document: {
    actions: (input, context) => {
      const filtered = singletonActions(context.schemaType);
      return filtered
        ? input.filter((a) => filtered.includes(a.action!))
        : input;
    },
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (item) => !singletonTypes.has(item.templateId)
        );
      }
      return prev;
    },
  },
});
