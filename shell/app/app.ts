import { loadRemoteModule } from "@softarc/native-federation-runtime";

async function renderMicroFrontend(id, team, component) {
    return loadRemoteModule(team, `./${component}`)
        .then(_ => {
            const comp = document.createElement(component);
            document.getElementById(id).appendChild(comp);
        })
}

async function loadMicroFrontend(team, component) {
    return loadRemoteModule(team, `./${component}`);
}
export {renderMicroFrontend, loadMicroFrontend};