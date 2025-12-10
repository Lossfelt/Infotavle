import config from "./config";

export function definerQuery() {
  const { quayId, lines } = config.ruter;
  // Convert lines object values to an array of strings for the query
  const lineIds = Object.values(lines).map(id => `"${id}"`).join(", ");

  return `
  {
    quay(id: "${quayId}") {
      id
      name
      estimatedCalls(
        timeRange: 72100,
        numberOfDepartures: 10
        numberOfDeparturesPerLineAndDestinationDisplay: 5
        whiteListed: {lines: [${lineIds}]}
      ) {
        realtime
        aimedDepartureTime
        expectedDepartureTime
        actualDepartureTime
        cancellation
        situations {
          situationNumber
          description {
            value
            language
          }
          summary {
            value
            language
          }
        }
        date
        destinationDisplay {
          frontText
        }
        quay {
          id
        }
        serviceJourney {
          journeyPattern {
            line {
              id
              name
              transportMode
            }
          }
        }
      }
    }
}
`;
}
