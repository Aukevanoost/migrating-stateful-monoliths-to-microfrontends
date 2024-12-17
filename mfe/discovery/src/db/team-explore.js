const TEASERS = [
    {
        url: "http://localhost:4000/teasers/Component-X7O62X5V.js",
        metadata: {
            integrity: "CHECKSUM",
            version: "1.0.0"
        },
        deployment: {
            traffic: 100,
            default: true,
            production: true 
        },
        extras: {
            nativefederation: {
                remoteEntry: "http://localhost:4000/teasers/remoteEntry.json",
                exposedModule: "./Component",
                element: "exp-teasers"
            },
        },
    }
]

const RECOMMENDATIONS = [
    {
        url: "http://localhost:4000/recommendations/Component-LSWIOGY7.js",
        metadata: {
            integrity: "CHECKSUM",
            version: "1.0.0"
        },
        deployment: {
            traffic: 100,
            default: true,
            production: true 
        },
        extras: {
            nativefederation: {
                remoteEntry: "http://localhost:4000/recommendations/remoteEntry.json",
                exposedModule: "./Component",
                element: "exp-recommendations"
            },
        },
    }
]

const EXPLORE_MFE = {
    "explore/teasers": TEASERS,
    "explore/recommendations": RECOMMENDATIONS
}

module.exports = {
    EXPLORE_MFE
}
