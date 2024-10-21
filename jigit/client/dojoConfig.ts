import { createDojoConfig } from "@dojoengine/core";

import manifest from "../dojo-starter/manifests/dev/manifest.json";

export const dojoConfig = createDojoConfig({
  manifest,
});
