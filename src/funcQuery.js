export function definerQuery() {
  return `
  {
stopPlace(id: "NSR:StopPlace:58249") {
  id
  name
  estimatedCalls(timeRange: 3600, numberOfDepartures: 20) {     
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
