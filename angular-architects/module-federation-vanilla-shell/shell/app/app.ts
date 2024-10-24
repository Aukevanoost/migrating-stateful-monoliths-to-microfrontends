(async function init() {
    try {
        const container = document.getElementById('container');
        if (!container) {
            throw new Error('Container element not found');
        }

        const mfe1 = await import('mfe1/Component');
        const mfe1root = document.createElement('mfe-one');
        container.appendChild(mfe1root);

        const mfe2 = await import('mfe2/Component');
        const mfe2root = document.createElement('mfe-two');
        container.appendChild(mfe2root);

    } catch (error) {
        console.error('Error initializing application:', error);
    }
})();

export {};