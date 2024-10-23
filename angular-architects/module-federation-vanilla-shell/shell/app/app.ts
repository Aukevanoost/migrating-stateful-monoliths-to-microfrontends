(async function init() {
    try {
        const container = document.getElementById('container');
        if (!container) {
            throw new Error('Container element not found');
        }

        const module = await import('mfe1/Component');
        const wcTest = document.createElement('mfe-one');
        container.appendChild(wcTest);
    } catch (error) {
        console.error('Error initializing application:', error);
    }
})();

export {};