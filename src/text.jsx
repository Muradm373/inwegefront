const descrEng =
  "There is no information available for this occupation in this region. Please choose another county or another occupation.";
const averageEng = "Average in Estonia";
const differenceEng = ["Men earn", " more ", " less", " than women."];
const lngEng = "en";
const tabsEng = ["Wages", "Pensions", "Wage Calculator"];
const mainEng = ["Home", "About", "Contact"];
const genderEng = ["Male", "Female"];

const descrRus =
  "Отсутствует информация данной позиции в этом регионе. Пожалуйста выберите другую позицию или регион.";
const averageRus = "Среднее по Эстонии";
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

function changeLanguage(language) {
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

export {
  noDescr,
  averageLabel,
  differenceLabel,
  genderLabel,
  lng,
  tabs,
  main,
  changeLanguage
};
