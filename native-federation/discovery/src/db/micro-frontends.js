const { TEASERS, RECOMMENDATIONS } = require("./team-explore");

const MICRO_FRONTENDS =  {
    schema: "https://github.com/awslabs/frontend-discovery/blob/main/schema/v1-pre.json",
    microFrontends: {
        "explore/teasers": TEASERS,
        "explore/recommendations": RECOMMENDATIONS
    }
}

module.exports = MICRO_FRONTENDS;