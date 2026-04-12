const config = {
    api: {
        enturGraphQl: "https://api.entur.io/journey-planner/v3/graphql",
        clientName: "lossfelt-tavle",
    },
    ruter: {
        stopPlaceId: "NSR:StopPlace:5953",
        query: {
            timeRange: 72100,
            numberOfDepartures: 10,
            numberOfDeparturesPerLineAndDestinationDisplay: 5
        },
        lines: {
            line70: "RUT:Line:70",
            line78: "RUT:Line:78",
            line79: "RUT:Line:79",
            line3969: "RUT:Line:3969",
        },
        quays: {
            line70National: "NSR:Quay:10920",
            line78Ostensjo: "NSR:Quay:10920",
            line79Asbraten: "NSR:Quay:10917",
            line79Grorud: "NSR:Quay:10919",
        },
    },
    urls: {
        yrMeteogram: "https://www.yr.no/nb/innhold/1-72837/meteogram.svg",
        stromprisApi: "https://www.hvakosterstrommen.no/api/v1/prices",
    },
    strom: {
        zone: "NO1",
    },
    ui: {
        showStrompriser: false,
    },
    refetchIntervals: {
        rutetider: 60 * 1000 * 5, // 5 minutter
        strompriser: 1000 * 60 * 60, // 1 time
        meteogram: 1000 * 60 * 60, // 1 time
    }
};

export default config;
