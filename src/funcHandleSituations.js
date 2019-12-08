export function handleSituations(motByen, fraByen) {
  var situations = [];

  motByen.forEach(element => {
    if (element.Avvik) {
      element.Avvik.forEach(problem => {
        situations.push(problem.situationNumber);
      });
    }
  });
  fraByen.forEach(element => {
    if (element.Avvik) {
      element.Avvik.forEach(problem => {
        situations.push(problem.situationNumber);
      });
    }
  });

  //console.log(motByen);
  //console.log(fraByen);

  if (situations.length) {
    return situations;
  } else {
    return "Ingen større avvik";
  }
}
