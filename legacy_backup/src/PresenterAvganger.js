import React from "react";

const PresenterAvganger = ({ avganger }) => {
  if (!avganger) return null;

  return (
    <div>
      {avganger.map((element, index) => {
        // Use a unique key if available, fallback to index
        // Ideally 'element' should have a unique ID from the API
        const key = index;

        if (element.Kansellert) {
          return (
            <div key={key}>
              <del>{element.Avgang[0]}</del>
            </div>
          );
        } else if (element.Forsinket) {
          return (
            <div key={key} className="redtext">
              <del>{element.Avgang[0]}</del> {element.Avgang[1]}
            </div>
          );
        } else {
          return <div key={key}>{element.Avgang[0]}</div>;
        }
      })}
    </div>
  );
};

export default PresenterAvganger;
