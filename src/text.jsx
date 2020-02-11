export const API_URL = "http://inwege-api.cloud.ut.ee/api";
export const APP_NAME = "InWeGe";
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
const averagesEng = [
  "Average for ",
  "Average for Occupation",
  "Average for Estonia"
];
const mainEng = ["Home", "About", "Contact", "Navigation"];
const genderEng = ["Male", "Female"];
const selectRegionEng = "Select region";
const selectOccupationEng = "Select job title";
const averageBetweenMenAndWomenEng = "Average salary for men and women in ";
const leaveAFeedBackEng = "Leave a feedback!";
const averageDataEng = "Average data over Estonia";

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
const mainRus = ["Главная", "О нас", "Контакты"];
const genderRus = ["Мужчины", "Женщины"];
const selectRegionRus = "Выберите регион";
const selectOccupationRus = "Выберите должность";
const averageBetweenMenAndWomenRus =
  "Средний показатель между женщинами и мужчинами";
const leaveAFeedBackRus = "Оставьте отзыв!";

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
      break;
    case "ru":
      noDescr = descrRus;
      averageLabel = averageRus;
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
  averageDataEng,
  averages
};
