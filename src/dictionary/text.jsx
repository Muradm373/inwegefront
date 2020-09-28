import { methodologyEng } from "./textMethodology";

export const API_URL = "http://inwege-api.cloud.ut.ee/api";
export const APP_NAME = "palgakompass.stat.ee";
export const menColor = "#3F1A84";
export const womenColor = "#F58FA9";
const descrEng =
  ["There is no information available for this occupation in this region. Please choose another county or another occupation. Average for Estonia is shown.", "Отсутствует информация данной позиции в этом регионе. Пожалуйста выберите другую позицию или регион.",
  "Selle ametikoha kohta selles maakonnas infot ei ole. Palun vali teine maakond või teine amet. Näidatud on keskmised palgad kogu Eestis."];
const averageEng = ["Average in Estonia for ", "Среднее по Эстонии для ", "Keskmine palk Eestis ametialal"];
const salaryEng = [["Your", "salary"],  ["Bаша", "зарплата"], ["Sinu", "palk"]];
const differenceEng = [[
  "Men earn",
  " more ",
  " less",
  " than",
  " women",
  " men",
  "You earn",
  " on average",
],  [
  "Мужчины зарабатывают на ",
  " больше ",
  " меньше",
  "",
  " женщин",
  " мужчин",
  "Вы зарабатываете на",
  " в среднем",
],  [
  "Mehed teenivad ",
  " rohkem ",
  " vähem",
  "",
  " kui naised",
  " kui mehed",
  "Sina teenid",
  " keskmiselt",
]];
const lngEng = ["en", "ru", "es"];
const tabsEng = [["Home", "Wage Forecast", "Pensions", "Methodology"],  ["Главная", "Калькулятор зарплаты",  "Пенсии","Mетодология"], ["Kodu",  "Palgaprognoos","Pensionid", "Metoodika"]];
const averagesEng = [["Average for ", "Average for ", "Average for Estonia"], ["Среднее для ", "Среднее по  ", "Среднее по Эстонии"], [
  "Keskmine ",
  "Keskmine ",
  "Keskmine palk Eestis ametialal",
]];
const mainEng = [["Home", "About", "Contact", "Navigation"],["Главная", "О ", "Контакты", "Навигация по сайту"], ["Kodu", "Meist", "Kontaktid", "Navigeerimine"]];
const genderEng = [["Male", "Female"], ["Мужчины", "Женщины"], ["Mees", "Naine"]];
const selectRegionEng = ["Select region", "Выберите регион", "Vali maakond"];
const selectOccupationEng = ["Select job title", "Выберите должность","Vali amet" ] ;
const averageBetweenMenAndWomenEng = ["Average salary for men and women in ", "Средний показатель между женщинами и мужчинами - ",  "Keskmine palk täisajaga töötavatel meestel ja naistel - "] ;
const leaveAFeedBackEng = ["Leave a feedback!", "Оставьте отзыв!", "Saada tagasiside siit!"] ;
const averageDataEng = ["Average over Estonia", "Среднее по Эстонии",  "Eesti keskmine jaotus"] ;
const aboutEng =
  ["Palgakompass.ee is a web application that aimes to create more transparancy in the labor market in Estonia using Estonian wage data. Any person can use Palgakompass to compare wages accross different occupations, counties and genders. The application also features a pensions and a wage forecast section.",
  "Palgakompass.ee это веб-приложение, целью которого является увеличение доступности информации на рынке труда в Эстонии с использованием данных о заработной плате в Эстонии. Любой человек может использовать Palgakompass для сравнения заработной платы по различным профессиям, округам и полам. В приложении также есть раздел о пенсиях и прогнозе заработной платы.",
  "Palgakompass.ee on veebirakendus, mille eesmärk on suurendada teabe kättesaadavust Eesti tööturul kasutades palgaandmeid. Igaüks saab Palgakompassi kasutada eri ametite, maakondade ja sugude palkade võrdlemiseks. Lisaks on eraldi rubriigid pensioni- ja palgaprognooside kohta."] ;
const pieChartLabelsEng = [[
  "Average wages for the given occupation in the given county.",
  "Average wages for all occupations in \nthe given county.",
  "Average wages for all occupations \nfor all counties.",
],
[
  "Средняя зарплата для выбранных должности и региона.",
  "Средняя зарплата для выбранного региона относительно всех должностей.",
  "Средняя зарплата для выбранной должности относительно всех регионов.",
],
[
  "Keskmine palk valitud ametikohal ja piirkonnas.",
  "Valitud piirkonna keskmine palk kõigi ametikohtade suhtes.",
  "Valitud ametikoha keskmine palk kõigi piirkondade suhtes.",
]
] ;
const detailsLabelEng = ["Details", "Описание", "Detailid"] ;
const descriptionLabelEng = ["Description", "Тема", "Kirjeldus"] ;
const defaultGenderEng = ["Gender", "Пол", "Sugu"] ;
const occupationSelectorPlaceholderEng =
  ["First you need to select county from the map", "Сначала вам нужно выбрать округ на карте", "Esmalt tuleb kaardilt valida maakond"] ;
const overallEng = ["Overall in Estonia", "B Эстонии", "Üldiselt Eestis"] ;


const searchLabelEng = ["Search","Поиск", "Otsing"];
const sideParagraph1Eng = ["To see the difference between your and average wages you can fill the boxes below.",
"Чтобы увидеть разницу между вашей и средней заработной платой, заполнитe поля ниже",
"Oma ja keskmise palga erinevuse nägemiseks võite täita järgmised lahtrid."]
const sideParagraph2Eng = ["After selecting county from the map, you can search for a job by job title.",
"После выбора региона на карте, вы можете выбрать профессию",
"Pärast kaardil piirkonna valimist saate valida töö"
]
const noDataLabelEng = ["No data for the selected occupation",
"Нет данных по выбранной профессии",
"Valitud ameti kohta andmed puuduvad"];
const noDataEng = ["No data",
"Нет данных",
"Valitud ameti"];
const averageWageEng = ["Average Wage", "Средняя зарплата","Keskmine palk"];
const medianWageEng =["Median Wage", "Средняя зарплата (Медиана)", "Mediaanpalk"];
const genderWageGapEng =["Gender Wage Gap", "Разница в заработной плате", "Palkade erinevus"];
const totalNumberOfEmployeesEng = ["Total number of full-time employees in Estonia ", "Общее количество сотрудников в Эстонии", "Täisajaga töötavate töötajate koguarv Eestis"];
const totalNumberOfEmployeesOccupationEng = [["Total number of employees in occupation ", " in "], ["Общее количество работников по роду занятий", ""], ["Tööga hõivatud töötajate koguarv: ", ""]];
const averageDataSpecEng = [["Average for occupation","Average for county"], ["Средний по профессии","Средний по региону"], [ "Keskmine hõivatus", "Maakonna keskmine"]];
const computarizationEng = [["high risk of computerization", "medium risk of computerization", "low risk of computerization"], ["высокий риск компьютеризации", "средний риск компьютеризации", "низкий риск компьютеризации"], ["suur arvutistamise oht", "keskmine arvutistamise oht", "madal arvutistamise oht"]];
const retirementEng = [["high replacements needs due to retirement","medium replacements needs due to retirement","low replacements needs due to retirement"],["высокая потребность в замене из-за выхода на пенсию", "средняя потребность в замене из-за выхода на пенсию", "низкая потребность в замене из-за выхода на пенсию"],["pensionist tingitud suured asendamisvajadused", "pensionist tulenevad keskmised asendamisvajadused", "pensionile jäämise tõttu madalad asendamisvajadused"]]
const pensionLabelEng = [["Estimated wage in 2030 for occupation is between","and","The risk of computerization for this occupation is", "and the replacements needs due to retirement are"],["Расчетная заработная плата в 2030 году для профессии между", "и", "Риск компьютеризации для этой профессии", "и потребности в заменах из-за выходa на пенсию"],["Eeldatav töötasu suurus 2030. aastal on okupatsiooni ajal vahemikus", "ja", "Selle okupatsiooni arvutistamise oht on", "ja asendajad vajavad pensionile jäämine on "]]
const lessMoreLabelEng = [["Higher than","Less than"],["Выше чем", "Mеньше чем"],["Kõrgem kui", "vähem kui"]];
const levelsEng = [["low","medium", "high"],["низкий", "средний", "высокий"],["madal", "keskmine", "kõrge"]];
const ageLabelEng = ["Age distribution of employees.","Возрастное распределение работников" , "Töötajate vanuseline jaotus."]
export default function changeLanguage(language) {
  let i;
  switch (language) {
    default:
     i = 0;
      break;
    case "ru":
     i = 1;
      break;
    case "es":
     i = 2;
      break;
  }

  
  ageLabel = ageLabelEng[i];
  noDescr = descrEng[i];
  averageLabel = averageEng[i];
  differenceLabel = differenceEng[i];
  genderLabel = genderEng[i];
  lng = lngEng[i];
  tabs = tabsEng[i];
  main = mainEng[i];
  selectOccupation = selectOccupationEng[i];
  selectRegion = selectRegionEng[i];
  averageBetweenMenAndWomen = averageBetweenMenAndWomenEng[i];
  leaveAFeedBack = leaveAFeedBackEng[i];
  salary = salaryEng[i];
  about = aboutEng[i];
  pieChartLabels = pieChartLabelsEng[i];
  detailsLabel = detailsLabelEng[i];
  descriptionLabel = descriptionLabelEng[i];
  averages = averagesEng[i];
  defaultGender = defaultGenderEng[i];
  occupationSelectorPlaceholder = occupationSelectorPlaceholderEng[i];
  methodology = methodologyEng[i];
  searchLabel = searchLabelEng[i];
  sideParagraph1 = sideParagraph1Eng[i];
  sideParagraph2 = sideParagraph2Eng[i];
  noDataLabel = noDataLabelEng[i];
  noData = noDataEng[i];
  averageWage = averageWageEng[i];
  medianWage = medianWageEng[i];
  genderWageGap = genderWageGapEng[i];
  overall = overallEng[i];
  totalNumberOfEmployees = totalNumberOfEmployeesEng[i];
  totalNumberOfEmployeesOccupation = totalNumberOfEmployeesOccupationEng[i];
  averageData = averageDataEng[i];
  averageDataSpec = averageDataSpecEng[i];
  computarization = computarizationEng[i];
  retirement = retirementEng[i];
  pensionLabel = pensionLabelEng[i];
  lessMoreLabel = lessMoreLabelEng[i];
  levels = levelsEng[i];
  
}


export let youtube = "https://www.youtube.com/channel/UCh3mRDb9k85oIZ-LREMCopA";
export let facebook = "https://www.facebook.com/Vordsetevoimalustevolinik";
export let instagram = "https://www.instagram.com/vordsetevoimalustevolinik/";
export let linkedin = "https://www.linkedin.com/company/statistikaamet-statistics-estonia/";
export let twitter = "https://twitter.com/eestistatistika";
export let noDescr = descrEng[0];
export let occupationSelectorPlaceholder = occupationSelectorPlaceholderEng[0];
export let salary = salaryEng[0];
export let averageLabel = averageEng[0];
export let differenceLabel = differenceEng[0];
export let genderLabel = genderEng[0];
export let lng = lngEng[0];
export let tabs = tabsEng[0];
export let main = mainEng[0];
export let selectOccupation = selectOccupationEng[0];
export let selectRegion = selectRegionEng[0];
export let averageBetweenMenAndWomen = averageBetweenMenAndWomenEng[0];
export let leaveAFeedBack = leaveAFeedBackEng[0];
export let averages = averagesEng[0];
export let about = aboutEng[0];
export let pieChartLabels = pieChartLabelsEng[0];
export let detailsLabel = detailsLabelEng[0];
export let descriptionLabel = descriptionLabelEng[0];
export let averageData = averageDataEng[0];
export let defaultGender = defaultGenderEng[0];
export let overall = overallEng[0];
export let methodology = methodologyEng[0];
export let searchLabel = searchLabelEng[0];
export let sideParagraph1 = sideParagraph1Eng[0];
export let sideParagraph2 = sideParagraph2Eng[0];
export let noDataLabel = noDataLabelEng[0];
export let noData = noDataEng[0];
export let averageWage = averageWageEng[0];
export let medianWage = medianWageEng[0];
export let genderWageGap = genderWageGapEng[0];
export let totalNumberOfEmployees = totalNumberOfEmployeesEng[0];
export let totalNumberOfEmployeesOccupation = totalNumberOfEmployeesOccupationEng[0];
export let averageDataSpec = averageDataSpecEng[0];
export let computarization = computarizationEng[0];
export let retirement = retirementEng[0];
export let pensionLabel = pensionLabelEng[0];
export let lessMoreLabel = lessMoreLabelEng[0];
export let levels = levelsEng[0];
export let ageLabel = ageLabelEng[0];
