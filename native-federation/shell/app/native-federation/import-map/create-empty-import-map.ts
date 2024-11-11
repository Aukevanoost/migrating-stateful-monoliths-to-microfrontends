import { ImportMap } from "./import-map.contract";

const createEmptyImportMap = (): ImportMap => ({
    imports: {},
    scopes: {}
})

export { createEmptyImportMap};