export function definerQuery() {
  return `
  {
    stopPlace(
      id: "NSR:StopPlace:5953"
    ) {
      id
      name
      estimatedCalls(
        timeRange: 72100,
        numberOfDepartures: 20
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
