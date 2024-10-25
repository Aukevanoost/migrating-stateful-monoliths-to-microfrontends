import { loadRemoteModule } from "@softarc/native-federation-runtime";

/**
 * Renders a micro frontend component into the specified DOM element.
 * 
 * @param {string} id - The ID of the DOM element where the component should be rendered
 * @param {string} team - The team identifier for the remote module
 * @param {string} component - The name of the component to be rendered
 * @returns {Promise<void>} A promise that resolves when the component is rendered
 * @throws {Error} If the DOM element with the specified ID is not found
 * @example
 * // Render a teaser component from the 'explore' team into element with id 'teasers'
 * await renderMicroFrontend('teasers', 'explore', 'exp-teasers');
 */
async function renderMicroFrontend(id: string, team: string, component: string): Promise<void> {
    return loadRemoteModule(team, `./${component}`)
        .then(_ => {
            const comp = document.createElement(component);
            const container = document.getElementById(id);
            if (!container) {
                throw new Error(`Container element with id '${id}' not found`);
            }
            container.appendChild(comp);
        });
}

/**
 * Loads a micro frontend module without rendering it.
 * Useful when you need to access the module's exports directly.
 * 
 * @param {string} team - The team identifier for the remote module
 * @param {string} component - The name of the component to be loaded
 * @returns {Promise<any>} A promise that resolves with the loaded module
 * @example
 * // Load a module from the 'explore' team
 * const module = await loadMicroFrontend('explore', 'exp-teasers');
 */
async function loadMicroFrontend(team: string, component: string): Promise<any> {
    return loadRemoteModule(team, `./${component}`);
}

export { renderMicroFrontend, loadMicroFrontend };