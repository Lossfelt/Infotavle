import React from "react";
import { GraphQLClient } from "graphql-request";
import { behandleRutetider } from "./funcRutetider";
import PresenterAvganger from "./PresenterAvganger";

class Rutetider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      motByen: "",
      fraByen: ""
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
    var dataDeltITo = behandleRutetider(data.stopPlace.estimatedCalls);

    this.setState({ motByen: dataDeltITo[1] });
    this.setState({ fraByen: dataDeltITo[0] });
    //console.log(data);
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
        T-banen
        <div className="grid-container2">
          <div>Mot byen</div>
          <div>Fra byen</div>
          <div>Avvik</div>
          <div>
            <PresenterAvganger avganger={this.state.motByen} />
          </div>
          <div>
            <PresenterAvganger avganger={this.state.fraByen} />
          </div>
          <div>under arbeid</div>
        </div>
      </div>
    );
  }
}

export default Rutetider;
