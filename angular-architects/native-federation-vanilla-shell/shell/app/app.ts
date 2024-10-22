import { loadRemoteModule } from "@softarc/native-federation-runtime";

(async function() { 
    const module = await loadRemoteModule('mfe', './wc-test');
    const wcTest = document.createElement('app-root');
    document.body.appendChild(wcTest);
})();