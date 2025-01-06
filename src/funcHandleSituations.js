export function handleSituations(motByen, fraByen) {
  var situations = [];
  var prosesserteSituasjoner = [];
  var motOgFra = [motByen, fraByen];

  motOgFra.forEach(vei => {
    vei.forEach(element => {
      if (element.Avvik) {
        element.Avvik.forEach(problem => {
          if (!prosesserteSituasjoner.includes(problem.situationNumber)) {
            prosesserteSituasjoner.push(problem.situationNumber);
            if (problem.summary.length) {
              problem.summary.forEach(summary => {
                if (summary.language === "no" && !situations.includes(summary.value)) {
                  situations.push(summary.value);
                }
              });
            } else if (problem.description.length) {
              problem.description.forEach(description => {
                if (description.language === "no" && !situations.includes(description.value)) {
                  situations.push("description: " + description.value);
                }
              });
            }
          }
        });
      }
    });
  });

  //console.log(motByen);
  //console.log(fraByen);

  if (situations.length) {
    return situations.join('\n');
  } else {
    return "Ingen større avvik";
  }
}
