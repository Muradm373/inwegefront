const descrEng =
  "There is no information available for this occupation in this region. Please choose another county or another occupation.";
const averageEng = "Average in Estonia for ";
const differenceEng = ["Men earn", " more ", " less", " than women."];
const lngEng = "en";
const tabsEng = ["Wages", "Pensions", "Wage forecast"];
const mainEng = ["Home", "About", "Contact"];
const genderEng = ["Male", "Female"];
const selectRegionEng = "Select region";
const selectOccupationEng = "Select job title";

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

export default function changeLanguage(language) {
  switch (language) {
    case "en":
      noDescr = descrEng;
      averageLabel = averageEng;
      differenceLabel = differenceEng;
      genderLabel = genderEng;
      lng = lngEng;
      tabs = tabsEng;
      main = mainEng;
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

export {
  noDescr,
  averageLabel,
  differenceLabel,
  genderLabel,
  lng,
  tabs,
  main,
  selectOccupation,
  selectRegion
};
