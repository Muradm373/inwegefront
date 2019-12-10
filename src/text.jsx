const descrEng =
  "There is no information available for this occupation in this region. Please choose another county or another occupation. Average for Estonia is shown.";
const averageEng = "Average in Estonia for ";
const differenceEng = ["Men earn", " more ", " less", " than women."];
const lngEng = "en";
const tabsEng = ["Wages", "Pensions", "Wage forecast"];
const mainEng = ["Home", "About", "Contact"];
const genderEng = ["Male", "Female"];
const selectRegionEng = "Select region";
const selectOccupationEng = "Select job title";
const averageBetweenMenAndWomenEng = "Average salary between men and women";

const descrRus =
  "Отсутствует информация данной позиции в этом регионе. Пожалуйста выберите другую позицию или регион.";
const averageRus = "Среднее по Эстонии для ";
const differenceRus = [
  "Мужчины зарабатывают на ",
  " больше ",
  " меньше",
  " женщин."
];
const lngRus = "ru";
const tabsRus = ["Заработная плата", "Пенсии", "Калькулятор зарплаты"];
const mainRus = ["Главная", "О нас", "Контакты"];
const genderRus = ["Мужчины", "Женщины"];
const selectRegionRus = "Выберите регион";
const selectOccupationRus = "Выберите должность";
const averageBetweenMenAndWomenRus =
  "Средний показатель между женщинами и мужчинами";

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

      break;
  }
}

let noDescr = descrEng;
let averageLabel = averageEng;
let differenceLabel = differenceEng;
let genderLabel = genderEng;
let lng = lngEng;
let tabs = tabsEng;
let main = mainEng;
let selectOccupation = selectOccupationEng;
let selectRegion = selectRegionEng;
let averageBetweenMenAndWomen = averageBetweenMenAndWomenEng;

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
  averageBetweenMenAndWomen
};
