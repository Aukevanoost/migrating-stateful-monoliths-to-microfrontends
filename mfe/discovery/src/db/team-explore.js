const TEASERS = [
    {
        url: "http://docker.for.mac.localhost:4001/ssr-IGQPTHAQ.js",
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
                remoteEntry: "http://docker.for.mac.localhost:4001/remoteEntry.json",
                exposedModule: "./Component",
                element: "exp-teasers"
            },
            ssr: { html: "http://docker.for.mac.localhost:4001/html"}
        },
    }
]

const RECOMMENDATIONS = [
    {
        url: "http://docker.for.mac.localhost:4002/web-component-IAM3TNZN.js",
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
                remoteEntry: "http://docker.for.mac.localhost:4002/remoteEntry.json",
                exposedModule: "./Component",
                element: "exp-recommendations"
            },
            ssr: { html: "http://docker.for.mac.localhost:4002/html"}
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
