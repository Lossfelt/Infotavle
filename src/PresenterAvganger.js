import React from "react";

class PresenterAvganger extends React.Component {
  render() {
    if (!this.props.avganger) return null;
    var avganger = this.props.avganger;
    var liste = [];
    var keyInt = 1;

    avganger.forEach((element) => {
      if (element.Kansellert) {
        liste.push(
          <div key={keyInt}>
            <del>{element.Avgang[0]}</del>
          </div>
        );
      } else if (element.Forsinket) {
        liste.push(
          <div key={keyInt} className="redtext">
            <del>{element.Avgang[0]}</del> {element.Avgang[1]}
          </div>
        );
      } else {
        liste.push(<div key={keyInt}>{element.Avgang[0]}</div>);
      }
      keyInt += 1;
    });

    //console.log(avganger);
    //console.log(avganger);
    return <div>{liste}</div>;
  }
}

export default PresenterAvganger;
