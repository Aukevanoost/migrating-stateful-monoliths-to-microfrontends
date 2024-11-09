import { ImportMap } from "./../models/import-map";

const appendImportMapToBody = (map: ImportMap): void => {
    document.head.appendChild(
        Object.assign(document.createElement('script'), {
            type: 'importmap-shim',
            innerHTML: JSON.stringify(map),
        })
    );
}

export { appendImportMapToBody };