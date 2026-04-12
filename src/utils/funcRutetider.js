import dateformat from "dateformat";
import config from "../config";

export function behandleRutetider(data) {
  const departures = {
    line70National: [],
    line78Ostensjo: [],
    line79Asbraten: [],
    line79Grorud: [],
  };

  const { lines, quays } = config.ruter;

  data.forEach((element) => {
    if (element.serviceJourney.journeyPattern.line.transportMode !== "bus") {
      return;
    }

    const aimedTime = dateformat(element.aimedDepartureTime, "HH:MM");
    const expectedTime = dateformat(element.expectedDepartureTime, "HH:MM");
    const lineId = element.serviceJourney.journeyPattern.line.id;
    const quayId = element.quay.id;
    const isLine3969 = lineId === lines.line3969;

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
      lineId,
    };

    if ((lineId === lines.line70 || isLine3969) && quayId === quays.line70National) {
      departures.line70National.push(departureObj);
    } else if (lineId === lines.line78 && quayId === quays.line78Ostensjo) {
      departures.line78Ostensjo.push(departureObj);
    } else if (lineId === lines.line79 && quayId === quays.line79Asbraten) {
      departures.line79Asbraten.push(departureObj);
    } else if (lineId === lines.line79 && quayId === quays.line79Grorud) {
      departures.line79Grorud.push(departureObj);
    }
  });

  return {
    line70National: departures.line70National.slice(0, 5),
    line78Ostensjo: departures.line78Ostensjo.slice(0, 5),
    line79Asbraten: departures.line79Asbraten.slice(0, 5),
    line79Grorud: departures.line79Grorud.slice(0, 5),
  };
}
