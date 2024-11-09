const { TEASERS, RECOMMENDATIONS } = require("./team-explore");

const TEAMS = {
    "explore": {
        entryPoint: "http://localhost:4200/remoteEntry.json",
        microfrontends: {
            "teasers": TEASERS,
            "recommendations": RECOMMENDATIONS
        }
    }
}

module.exports = TEAMS;