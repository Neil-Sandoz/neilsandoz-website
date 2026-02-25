import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});
