import { type SchemaTypeDefinition } from "sanity";
import project from "./project";
import siteSettings from "./siteSettings";
import aboutContent from "./aboutContent";
import contactSubmission from "./contactSubmission";

export const schemaTypes: SchemaTypeDefinition[] = [
  project,
  siteSettings,
  aboutContent,
  contactSubmission,
];
