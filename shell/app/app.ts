import { loadRemoteModule } from "./native-federation";

/**
 * Loads a micro frontend module without rendering it.
 * Useful when you need to access the module's exports directly.
 * 
 * @param {string} team - The team identifier for the remote module
 * @param {string} component - The name of the component to be loaded
 * @param {string} containerID - (optional) ID of parent HTML element in DOM tree where MFE should be rendered
 * @returns {Promise<any>} A promise that resolves with the loaded module
 * @example
 * // Load a module from the 'explore' team
 * <body>
 *   <main id="mfe-container"></main>
 *  
 *   <script>
 *     loadMicroFrontend("explore", "exp-teasers", "mfe-container")
 *   </script>
 * </body>
*/
function loadMicroFrontend(team: string, component: string, containerID?: string): Promise<any> {
    return loadRemoteModule(team, `./${component}`)
    .then(_ => {
        if(!!containerID) {
            const comp = document.createElement(component);
            const container = document.getElementById(containerID);
            if (!container) {
                throw new Error(`Container element with id '${containerID}' not found`);
            }
            container.appendChild(comp);
        }
    });
}

export { loadMicroFrontend };