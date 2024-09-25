import { createDojoConfig } from "@dojoengine/core";

import manifest from "../dojo-jigit/manifests/dev/manifest.json";

export const dojoConfig = createDojoConfig({
  manifest,
});
