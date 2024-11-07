const TEASERS = [
    {
        url: "http://localhost:4200/exp-teasers.js",
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
                url: "http://localhost:4200",
                manifest: "./remoteEntry.json",
                key: "./exp-teasers",
                element: "exp-teasers"
            },
        },
    }
]

const RECOMMENDATIONS = [
    {
        url: "http://localhost:4200/exp-recommendations.js",
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
                url: "http://localhost:4200",
                manifest: "./remoteEntry.json",
                key: "./exp-recommendations",
                element: "exp-recommendations"
            },
        },
    }
]

module.exports = {
    TEASERS, RECOMMENDATIONS
}
