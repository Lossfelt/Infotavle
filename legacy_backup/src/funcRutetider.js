import dateformat from "dateformat";
import config from "./config";

export function behandleRutetider(data) {
  var linjerMotByen = [];
  var linjerFraByen = [];

  const { quayId, lines } = config.ruter;

  data.forEach((element) => {
    var avgang = [];
    var forsinket = false;
    var kansellert = false;
    var avvik = "";
    if (element.serviceJourney.journeyPattern.line.transportMode === "bus") {
      avgang.push(
        dateformat(element.aimedDepartureTime, "HH:MM"),
        dateformat(element.expectedDepartureTime, "HH:MM")
      );
      //avgang = dateformat(element.expectedDepartureTime, "HH:MM");
      if (
        dateformat(element.expectedDepartureTime, "HH:MM") !==
        dateformat(element.aimedDepartureTime, "HH:MM")
      ) {
        forsinket = true;
      }
      if (element.cancellation) {
        kansellert = true;
      }
      if (element.situations.length) {
        avvik = element.situations;
      }
    }
    if (
      element.quay.id === quayId &&
      element.serviceJourney.journeyPattern.line.id === lines.line70
    ) {
      linjerMotByen.push({
        Avgang: avgang,
        Forsinket: forsinket,
        Kansellert: kansellert,
        Avvik: avvik
      });
    }
    if (
      element.quay.id === quayId &&
      element.serviceJourney.journeyPattern.line.id === lines.line78
    ) {
      linjerFraByen.push({
        Avgang: avgang,
        Forsinket: forsinket,
        Kansellert: kansellert,
        Avvik: avvik
      });
    }
    if (
      element.quay.id === quayId &&
      element.serviceJourney.journeyPattern.line.id === lines.line3969
    ) {
      avgang = avgang.map((dep) => "E" + dep);
      linjerMotByen.push({
        Avgang: avgang,
        Forsinket: forsinket,
        Kansellert: kansellert,
        Avvik: avvik,
      });
    }
  });
  var begge = [linjerFraByen, linjerMotByen];
  //console.log(linjerMotByen);
  //console.log(linjerFraByen);
  return begge;
}
