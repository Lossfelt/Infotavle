import dateformat from "dateformat";
import config from "../config";

export function behandleRutetider(data) {
  const motByen = [];
  const fraByen = [];

  const { quayId, lines } = config.ruter;

  data.forEach((element) => {
    // Only process buses
    if (element.serviceJourney.journeyPattern.line.transportMode !== "bus") {
      return;
    }

    const aimedTime = dateformat(element.aimedDepartureTime, "HH:MM");
    const expectedTime = dateformat(element.expectedDepartureTime, "HH:MM");
    
    // Check if line 3969 (prefix E)
    const isLine3969 = element.serviceJourney.journeyPattern.line.id === lines.line3969;
    
    const avgang = isLine3969 
      ? [`E${aimedTime}`, `E${expectedTime}`]
      : [aimedTime, expectedTime];

    const forsinket = expectedTime !== aimedTime;
    const kansellert = !!element.cancellation;
    const avvik = element.situations.length > 0 ? element.situations : [];

    const departureObj = {
      avgang,
      forsinket,
      kansellert,
      avvik,
      lineId: element.serviceJourney.journeyPattern.line.id
    };

    // Filter by Quay ID (though query already filters, good for safety)
    if (element.quay.id !== quayId) return;

    // Grouping logic
    if (element.serviceJourney.journeyPattern.line.id === lines.line70 || isLine3969) {
      motByen.push(departureObj);
    } else if (element.serviceJourney.journeyPattern.line.id === lines.line78) {
      fraByen.push(departureObj);
    }
  });

  return {
    fraByen: fraByen.slice(0, 5),
    motByen: motByen.slice(0, 5)
  };
}