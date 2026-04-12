import config from "../config";

export function definerQuery() {
  const { stopPlaceId, lines, query } = config.ruter;
  const { timeRange, numberOfDepartures, numberOfDeparturesPerLineAndDestinationDisplay } = query;
  const lineIds = Object.values(lines).map(id => `"${id}"`).join(", ");

  return `
  {
    stopPlace(id: "${stopPlaceId}") {
      id
      name
      quays {
        id
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
}
`;
}
