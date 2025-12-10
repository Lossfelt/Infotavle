const config = {
    api: {
        enturGraphQl: "https://api.entur.io/journey-planner/v3/graphql",
        clientName: "lossfelt-tavle",
    },
    ruter: {
        quayId: "NSR:Quay:10920",
        query: {
            timeRange: 72100,
            numberOfDepartures: 10,
            numberOfDeparturesPerLineAndDestinationDisplay: 5
        },
        lines: {
            line70: "RUT:Line:70",
            line78: "RUT:Line:78",
            line3969: "RUT:Line:3969",
        },
    },
    urls: {
        yrMeteogram: "https://www.yr.no/nb/innhold/1-72837/meteogram.svg",
        stromprisApi: "https://www.hvakosterstrommen.no/api/v1/prices",
    },
    strom: {
        zone: "NO1",
    }
};

export default config;