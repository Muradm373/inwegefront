export const API_URL = "http://inwege-api.cloud.ut.ee/api";
export const APP_NAME = "Palgakompass";
export const menColor = "#7db0ff";
export const womenColor = "#f00044";
const descrEng =
  "There is no information available for this occupation in this region. Please choose another county or another occupation. Average for Estonia is shown.";
const averageEng = "Average in Estonia for ";
const salaryEng = ["Your", "salary"];
const differenceEng = [
  "Men earn",
  " more ",
  " less",
  " than",
  " women",
  " men",
  "You earn",
  " on average"
];
const lngEng = "en";
const tabsEng = ["Home", "Pensions", "Wage Calculator"];
const averagesEng = ["Average for ", "Average for ", "Average for Estonia"];
const mainEng = ["Home", "About", "Contact", "Navigation"];
const genderEng = ["Male", "Female"];
const selectRegionEng = "Select region";
const selectOccupationEng = "Select job title";
const averageBetweenMenAndWomenEng = "Average salary for men and women in ";
const leaveAFeedBackEng = "Leave a feedback!";
const averageDataEng = "Average data over Estonia";
const aboutEng =
  "Palgakompass.ee is a web application that aimes to create more transparancy in the labor market in Estonia using Estonian wage data. Any person can use Palgakompass to compare wages accross different occupations, counties and genders. The application also features a pensions and a wage forecast section.";
const pieChartLabelsEng = [
  "Average wages for the given occupation in the given county.",
  "Average wages for all occupations in \nthe given county.",
  "Average wages for all occupations \nfor all counties."
];
const detailsLabelEng = "Details";
const descriptionLabelEng = "Description";
const defaultGenderEng = "Gender";

const descrRus =
  "Отсутствует информация данной позиции в этом регионе. Пожалуйста выберите другую позицию или регион.";
const averageRus = "Среднее по Эстонии для ";
const differenceRus = [
  "Мужчины зарабатывают на ",
  " больше ",
  " меньше",
  "",
  " женщин",
  " мужчин",
  "Вы зарабатываете на",
  " в среднем"
];
const salaryRus = ["Bаша", "зарплата"];
const lngRus = "ru";
const tabsRus = ["Главная", "Пенсии", "Калькулятор зарплаты"];
const averagesRus = ["Среднее для ", "Среднее по  ", "Среднее по Эстонии"];
const mainRus = ["Главная", "О ", "Контакты"];
const genderRus = ["Мужчины", "Женщины"];
const selectRegionRus = "Выберите регион";
const selectOccupationRus = "Выберите должность";
const averageBetweenMenAndWomenRus =
  "Средний показатель между женщинами и мужчинами";
const leaveAFeedBackRus = "Оставьте отзыв!";
const averageDataRus = "Среднее распределение по Эстонии";
const aboutRus =
  "Palgakompass.ee это веб-приложение, целью которого является увеличение доступности информации на рынке труда в Эстонии с использованием данных о заработной плате в Эстонии. Любой человек может использовать Palgakompass для сравнения заработной платы по различным профессиям, округам и полам. В приложении также есть раздел о пенсиях и прогнозе заработной платы.";
const pieChartLabelsRus = [
  "Средняя зарплата для выбранных должности и региона.",
  "Средняя зарплата для выбранного региона относительно всех должностей.",
  "Средняя зарплата для выбранной должности относительно всех регионов."
];
const detailsLabelRus = "Описание";
const descriptionLabelRus = "Тема";
const defaultGenderRus = "Пол";

const descrEst =
  "Selle ametikoha kohta selles maakonnas infot ei ole. Palun vali teine maakond või teine amet. Näidatud on keskmised palgad kogu Eestis.";
const averageEst = "Keskmine palk Eestis ametialal";
const averagesEst = [
  "Keskmine ",
  "Keskmine ",
  "Keskmine palk Eestis ametialal"
];
const differenceEst = [
  "Mehed teenivad ",
  " rohkem ",
  " vähem",
  "",
  " kui naised",
  " kui mehed",
  "Sina teenid",
  " keskmiselt"
];
const salaryEst = ["Sinu", "palk"];
const lngEst = "es";
const tabsEst = ["Kodu", "Pensionid", "Palgaprognoos"];
const mainEst = ["Kodu", "Meist", "Kontaktid"];
const genderEst = ["Mees", "Naine"];
const selectRegionEst = "Vali maakond";
const selectOccupationEst = "Vali amet";
const averageBetweenMenAndWomenEst =
  "Keskmine palk meestel ja naistel ametialal";
const leaveAFeedBackEst = "Saada tagasiside siit!";
const averageDataEst = "Eesti keskmine jaotus";
const aboutEst =
  "Palgakompass.ee on veebirakendus, mille eesmärk on suurendada teabe kättesaadavust Eesti tööturul kasutades palgaandmeid. Igaüks saab Palgakompassi kasutada eri ametite, maakondade ja sugude palkade võrdlemiseks. Lisaks on eraldi rubriigid pensioni- ja palgaprognooside kohta.";
const pieChartLabelsEst = [
  "Keskmine palk valitud ametikohal ja piirkonnas.",
  "Valitud piirkonna keskmine palk kõigi ametikohtade suhtes.",
  "Valitud ametikoha keskmine palk kõigi piirkondade suhtes."
];
const detailsLabelEst = "Detailid";
const descriptionLabelEst = "Kirjeldus";
const defaultGenderEst = "Sugu";

export default function changeLanguage(language) {
  switch (language) {
    default:
      noDescr = descrEng;
      averageLabel = averageEng;
      differenceLabel = differenceEng;
      genderLabel = genderEng;
      lng = lngEng;
      tabs = tabsEng;
      main = mainEng;
      selectOccupation = selectOccupationEng;
      selectRegion = selectRegionEng;
      averageBetweenMenAndWomen = averageBetweenMenAndWomenEng;
      leaveAFeedBack = leaveAFeedBackEng;
      salary = salaryEng;
      about = aboutEng;
      pieChartLabels = pieChartLabelsEng;
      detailsLabel = detailsLabelEng;
      descriptionLabel = descriptionLabelEng;
      averages = averagesEng;
      defaultGender = defaultGenderEng;
      break;
    case "ru":
      noDescr = descrRus;
      averageLabel = averageRus;
      averages = averagesRus;
      differenceLabel = differenceRus;
      genderLabel = genderRus;
      lng = lngRus;
      tabs = tabsRus;
      main = mainRus;
      selectOccupation = selectOccupationRus;
      selectRegion = selectRegionRus;
      averageBetweenMenAndWomen = averageBetweenMenAndWomenRus;
      leaveAFeedBack = leaveAFeedBackRus;
      salary = salaryRus;
      about = aboutRus;
      pieChartLabels = pieChartLabelsRus;
      detailsLabel = detailsLabelRus;
      descriptionLabel = descriptionLabelRus;
      averageData = averageDataRus;
      defaultGender = defaultGenderRus;
      break;

    case "es":
      noDescr = descrEst;
      averageLabel = averageEst;
      averages = averagesEst;
      differenceLabel = differenceEst;
      genderLabel = genderEst;
      lng = lngEst;
      tabs = tabsEst;
      main = mainEst;
      selectOccupation = selectOccupationEst;
      selectRegion = selectRegionEst;
      averageBetweenMenAndWomen = averageBetweenMenAndWomenEst;
      leaveAFeedBack = leaveAFeedBackEst;
      salary = salaryEst;
      about = aboutEst;
      pieChartLabels = pieChartLabelsEst;
      detailsLabel = detailsLabelEst;
      descriptionLabel = descriptionLabelEst;
      averageData = averageDataEst;
      defaultGender = defaultGenderEst;

      break;
  }
}

let noDescr = descrEng;
let salary = salaryEng;
let averageLabel = averageEng;
let differenceLabel = differenceEng;
let genderLabel = genderEng;
let lng = lngEng;
let tabs = tabsEng;
let main = mainEng;
let selectOccupation = selectOccupationEng;
let selectRegion = selectRegionEng;
let averageBetweenMenAndWomen = averageBetweenMenAndWomenEng;
let leaveAFeedBack = leaveAFeedBackEng;
let averages = averagesEng;
let about = aboutEng;
let pieChartLabels = pieChartLabelsEng;
let detailsLabel = detailsLabelEng;
let descriptionLabel = descriptionLabelEng;
let averageData = averageDataEng;
let defaultGender = defaultGenderEng;

export {
  noDescr,
  averageLabel,
  differenceLabel,
  genderLabel,
  lng,
  tabs,
  main,
  selectOccupation,
  selectRegion,
  averageBetweenMenAndWomen,
  leaveAFeedBack,
  salary,
  averageData,
  averages,
  about,
  pieChartLabels,
  descriptionLabel,
  detailsLabel,
  defaultGender
};
