"use server";

import { getPayload } from "payload";
import config from "@/payload.config";

export async function searchProjects(query: string) {
  const payload = await getPayload({ config });

  try {
    const result = await payload.find({
      collection: "projects",
      where: {
        or: [
          {
            title: {
              like: `%${query}%`,
            },
          },
          {
            services: {
              like: `%${query}%`,
            },
          },
        ],
      },
      limit: 10,
    });

    return result.docs;
  } catch (error) {
    console.error("Error searching projects:", error);
    return [];
  }
}

export async function getProjectTypes() {
  const payload = await getPayload({ config });

  try {
    // Determine unique services. 
    // Since 'services' is a text field, we'll fetch all projects (or a reasonable limit) and extract unique values.
    // Ideally, this should be a separate collection or use an aggregation, but for now we aggregate in memory.
    const result = await payload.find({
      collection: "projects",
      limit: 100, // Adjust limit based on expected volume
      select: {
          services: true
      }
    });

    const services = new Set<string>();
    result.docs.forEach((doc) => {
        if (typeof doc.services === 'string' && doc.services.trim() !== '') {
            // Split by comma if multiple services are allowed in one text field,
            // or just take the whole string. Based on Schema 'text', it might be comma separated or single.
            // Assuming single or user manually separates. Let's split by comma to be safe and trim.
            const splitServices = doc.services.split(',').map(s => s.trim()).filter(Boolean);
            splitServices.forEach(s => services.add(s));
        }
    });

    return Array.from(services);
  } catch (error) {
    console.error("Error fetching project types:", error);
    return [];
  }
}
