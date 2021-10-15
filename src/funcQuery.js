export function definerQuery() {
  return `
  {
    quay(id: "NSR:Quay:10920") {
      id
      name
      estimatedCalls(
        timeRange: 72100,
        numberOfDepartures: 10
        numberOfDeparturesPerLineAndDestinationDisplay: 5
        whiteListed: {lines: ["RUT:Line:70", "RUT:Line:78"]}
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
