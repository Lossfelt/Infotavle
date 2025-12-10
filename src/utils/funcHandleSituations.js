export function handleSituations(motByen, fraByen) {
  const situations = new Set();
  const processedSituationNumbers = new Set();
  
  // Combine both arrays
  const allDepartures = [...motByen, ...fraByen];

  allDepartures.forEach(departure => {
    if (departure.avvik && departure.avvik.length > 0) {
      departure.avvik.forEach(problem => {
        if (!processedSituationNumbers.has(problem.situationNumber)) {
          processedSituationNumbers.add(problem.situationNumber);
          
          // Prioritize Summary, then Description
          const summary = problem.summary.find(s => s.language === "no");
          const description = problem.description.find(d => d.language === "no");

          if (summary) {
            situations.add(summary.value);
          } else if (description) {
            situations.add("Beskrivelse: " + description.value);
          }
        }
      });
    }
  });

  if (situations.size > 0) {
    return Array.from(situations).join('\n');
  } else {
    return "Ingen større avvik";
  }
}

