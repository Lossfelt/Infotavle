import React from "react";
import { GraphQLClient } from "graphql-request";
import { behandleRutetider } from "./funcRutetider";
import PresenterAvganger from "./PresenterAvganger";
import { handleSituations } from "./funcHandleSituations";
import { definerQuery } from "./funcQuery.js";
import Clock from "./clock";

class Rutetider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      motByen: "",
      fraByen: "",
      situations: ""
    };
  }

  main = async () => {
    const endpoint = "https://api.entur.io/journey-planner/v2/graphql";

    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        "et-client-name": "lossfelt-tavle"
      }
    });

    const query = definerQuery();

    const data = await graphQLClient.request(query);
    var dataDeltITo = behandleRutetider(data.quay.estimatedCalls);

    this.setState({ motByen: dataDeltITo[1] });
    this.setState({ fraByen: dataDeltITo[0] });

    var situations = handleSituations(dataDeltITo[1], dataDeltITo[0]);
    this.setState({ situations: situations });
    //console.log(situations);
  };

  componentDidMount() {
    this.main().catch((error) => console.error(error));
  }

  render() {
    return (
      <div className="black-background">
        <Clock />
        <div className="grid-container2">
          <div className="liten_skrift">70 Nationaltheatret</div>
          <div className="liten_skrift">78A Østensjø Ring</div>
          <div className="liten_skrift">Avvik</div>
          <div>
            <PresenterAvganger avganger={this.state.motByen} />
          </div>
          <div>
            <PresenterAvganger avganger={this.state.fraByen} />
          </div>
          <div className="liten_skrift">{this.state.situations}</div>
        </div>
      </div>
    );
  }
}

export default Rutetider;
