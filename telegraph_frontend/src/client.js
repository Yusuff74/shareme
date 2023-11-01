import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "5zmj1l50",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: true,
  token:
    "skFptDIUrgO5EapVxRhH2d3v3E2pyjd1mcy5oRb7vWBjXksGWcJ1CsVUp8wkIGOkHWz6moP8bmvAEB3v6mS0e9ktxUzZXrKXJIs4tyeA2KQqc0ApwDgDOpnehdwIFRlhFYyALtRunHqIVzWOENWVAE15Z04LO98LYIcvv2yhQKCgijzys43J",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
