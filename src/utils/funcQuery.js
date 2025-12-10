import config from "../config";

export function definerQuery() {
  const { quayId, lines, query } = config.ruter;
  const { timeRange, numberOfDepartures, numberOfDeparturesPerLineAndDestinationDisplay } = query;
  
  // Convert lines object values to an array of strings for the query
  const lineIds = Object.values(lines).map(id => `"${id}"`).join(", ");

  return `
  {
    quay(id: "${quayId}") {
      id
      name
      estimatedCalls(
        timeRange: ${timeRange},
        numberOfDepartures: ${numberOfDepartures}
        numberOfDeparturesPerLineAndDestinationDisplay: ${numberOfDeparturesPerLineAndDestinationDisplay}
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