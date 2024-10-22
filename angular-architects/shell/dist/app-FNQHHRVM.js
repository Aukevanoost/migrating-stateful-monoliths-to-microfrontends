import {
  init_softarc_native_federation_runtime,
  loadRemoteModule
} from "./chunk-7LZWO5TD.js";

// app/app.ts
init_softarc_native_federation_runtime();
(async function() {
  const test = await loadRemoteModule("mfe", "./wc-test");
  console.log(test);
  const wcTest = document.createElement("app-root");
  document.body.appendChild(wcTest);
})();
