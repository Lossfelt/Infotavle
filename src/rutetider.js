import React from "react";
import { GraphQLClient } from "graphql-request";
import dateformat from "dateformat";

class Rutetider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stoppestedet: "rutetider lastes ned",
      estimatedCalls: {},
      lines: []
    };
  }

  main = async () => {
    const endpoint = "https://api.entur.io/journey-planner/v2/graphql";

    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        "et-client-name": "lossfelt-tavle"
      }
    });

    const query = `
    {
  stopPlace(id: "NSR:StopPlace:58249") {
    id
    name
    estimatedCalls(timeRange: 3600, numberOfDepartures: 20) {     
      realtime
      aimedArrivalTime
      aimedDepartureTime
      expectedArrivalTime
      expectedDepartureTime
      actualArrivalTime
      actualDepartureTime
      cancellation
      notices {
        text
      }
      situations {
        summary {
          value
        }
      }
      date
      forBoarding
      forAlighting
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

    const data = await graphQLClient.request(query);
    //console.log(data);
    this.setState({ stoppestedet: data.stopPlace.name });
    this.setState({ estimatedCalls: data.stopPlace.estimatedCalls });
    this.linesMotByen = "";
    this.linesFraByen = "";
    this.state.estimatedCalls.map(item => {
      if (
        item.serviceJourney.journeyPattern.line.transportMode === "metro" &&
        item.quay.id === "NSR:Quay:10851"
      )
        return (this.linesMotByen +=
          item.serviceJourney.journeyPattern.line.id +
          " = " +
          dateformat(item.expectedDepartureTime, "HH:MM") +
          "\n");
      else if (
        item.serviceJourney.journeyPattern.line.transportMode === "metro" &&
        item.quay.id === "NSR:Quay:10850"
      )
        return (this.linesFraByen +=
          item.serviceJourney.journeyPattern.line.id +
          " = " +
          dateformat(item.expectedDepartureTime, "HH:MM") +
          "\n");
    });
    this.setState({ linesMotByen: this.linesMotByen });
    this.setState({ linesFraByen: this.linesFraByen });
    //console.log(this.linesMotByen);
    //console.log(this.linesFraByen);
    //console.log(dateformat((this.lines[0].props.children[2]), "HH:MM"))
  };

  componentDidMount() {
    this.main().catch(error => console.error(error));
  }
  render() {
    return (
      <div>
        Manglerud
        <div className="grid-container2">
          <div>Mot byen</div>
          <div>Fra byen</div>
          <div>{this.state.linesMotByen}</div>
          <div>{this.state.linesFraByen}</div>
        </div>
      </div>
    );
  }
}

export default Rutetider;
