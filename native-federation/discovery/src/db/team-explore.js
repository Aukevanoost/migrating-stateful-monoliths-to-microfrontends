const TEASERS = [
    {
        url: "http://localhost:4201/exp-teasers.js",
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
                remoteEntry: "http://localhost:4201/remoteEntry.json",
                key: "./exp-teasers",
                element: "exp-teasers"
            },
        },
    }
]

const RECOMMENDATIONS = [
    {
        url: "http://localhost:4202/exp-recommendations.js",
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
                remoteEntry: "http://localhost:4202/remoteEntry.json",
                key: "./exp-recommendations",
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
