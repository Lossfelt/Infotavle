import React from "react";

class PresenterAvganger extends React.Component {
  render() {
    if (!this.props.avganger) return null;
    var avganger = this.props.avganger;
    var liste = [];

    avganger.forEach(element => {
      if (element.Kansellert) {
        liste.push(<div key={element.Avgang} className="strikethrough">{element.Avgang}</div>);
      } else if (element.Forsinket) {
        liste.push(<div key={element.Avgang} className="redtext">{element.Avgang}</div>);
      } else {
        liste.push(<div key={element.Avgang} >{element.Avgang}</div>);
      }
    });

    //console.log(avganger);
    //console.log(avganger);
    return <div>{liste}</div>;
  }
}

export default PresenterAvganger;
