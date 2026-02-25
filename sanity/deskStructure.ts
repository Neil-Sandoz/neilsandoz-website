import type { StructureBuilder } from "sanity/structure";

const SINGLETON_TYPES = new Set(["siteSettings", "aboutContent"]);

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Projects")
        .schemaType("project")
        .child(
          S.documentTypeList("project")
            .title("Projects")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),

      S.divider(),

      S.listItem()
        .title("Site Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),

      S.listItem()
        .title("About Page")
        .child(
          S.document().schemaType("aboutContent").documentId("aboutContent")
        ),

      S.divider(),

      S.listItem()
        .title("Contact Submissions")
        .schemaType("contactSubmission")
        .child(
          S.documentTypeList("contactSubmission")
            .title("Contact Submissions")
            .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
        ),
    ]);

export const singletonActions = (type: string) => {
  if (SINGLETON_TYPES.has(type)) {
    return ["publish", "discardChanges", "restore"];
  }
  return undefined;
};

export const singletonTypes = SINGLETON_TYPES;
