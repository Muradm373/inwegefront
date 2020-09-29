import { methodologyEng } from "./textMethodology";

export const API_URL = "http://inwege-api.cloud.ut.ee/api";
export const APP_NAME = "palgakompass.stat.ee";
export const menColor = "#3F1A84";
export const womenColor = "#F58FA9";
const averageEng = [
  "Average in Estonia for ",
  "Среднее по Эстонии для ",
  "Keskmine palk Eestis ametialal",
];
const salaryEng = [
  ["Your", "salary"],
  ["Bаша", "зарплата"],
  ["Sinu", "palk"],
];
const differenceEng = [
  [
    "Men earn",
    " more ",
    " less",
    " than",
    " women",
    " men",
    "You earn",
    " on average",
  ],
  [
    "Мужчины зарабатывают на ",
    " больше ",
    " меньше",
    "",
    " женщин",
    " мужчин",
    "Вы зарабатываете на",
    " в среднем",
  ],
  [
    "Mehed teenivad ",
    " rohkem ",
    " vähem",
    "",
    " kui naised",
    " kui mehed",
    "Sina teenid",
    " keskmiselt",
  ],
];
const lngEng = ["en", "ru", "es"];
const tabsEng = [
  ["Home", "Wage Forecast", "Pensions", "Methodology"],
  ["Главная", "Калькулятор зарплаты", "Пенсии", "Mетодология"],
  ["Kodu", "Palgaprognoos", "Pensionid", "Metoodika"],
];
const averagesEng = [
  ["Average for ", "Average for ", "Average for Estonia"],
  ["Среднее для ", "Среднее по  ", "Среднее по Эстонии"],
  ["Keskmine ", "Keskmine ", "Keskmine palk Eestis ametialal"],
];
const mainEng = [
  ["Home", "About", "Contact", "Navigation"],
  ["Главная", "О ", "Контакты", "Навигация по сайту"],
  ["Kodu", "Meist", "Kontaktid", "Navigeerimine"],
];
const genderEng = [
  ["Male", "Female"],
  ["Мужчины", "Женщины"],
  ["Mees", "Naine"],
];
const selectRegionEng = ["Select region", "Выберите регион", "Vali maakond"];
const selectOccupationEng = [
  "Select job title",
  "Выберите должность",
  "Vali amet",
];
const averageBetweenMenAndWomenEng = [
  "Average salary for men and women in ",
  "Средний показатель между женщинами и мужчинами - ",
  "Keskmine palk täisajaga töötavatel meestel ja naistel - ",
];
const leaveAFeedBackEng = [
  "Leave a feedback!",
  "Оставьте отзыв!",
  "Saada tagasiside siit!",
];
const averageDataEng = [
  "Average over Estonia",
  "Среднее по Эстонии",
  "Eesti keskmine jaotus",
];
const aboutEng = [
  "Palgakompass.ee is a web application that aimes to create more transparancy in the labor market in Estonia using Estonian wage data. Any person can use Palgakompass to compare wages accross different occupations, counties and genders. The application also features a pensions and a wage forecast section.",
  "Palgakompass.ee это веб-приложение, целью которого является увеличение доступности информации на рынке труда в Эстонии с использованием данных о заработной плате в Эстонии. Любой человек может использовать Palgakompass для сравнения заработной платы по различным профессиям, округам и полам. В приложении также есть раздел о пенсиях и прогнозе заработной платы.",
  "Palgakompass.ee on veebirakendus, mille eesmärk on suurendada teabe kättesaadavust Eesti tööturul kasutades palgaandmeid. Igaüks saab Palgakompassi kasutada eri ametite, maakondade ja sugude palkade võrdlemiseks. Lisaks on eraldi rubriigid pensioni- ja palgaprognooside kohta.",
];
const pieChartLabelsEng = [
  [
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
  ],
];
const detailsLabelEng = ["Details", "Описание", "Detailid"];
const descriptionLabelEng = ["Description", "Тема", "Kirjeldus"];
const defaultGenderEng = ["Gender", "Пол", "Sugu"];
const occupationSelectorPlaceholderEng = [
  "First you need to select county from the map",
  "Сначала вам нужно выбрать округ на карте",
  "Esmalt tuleb kaardilt valida maakond",
];
const overallEng = ["Overall in Estonia", "B Эстонии", "Üldiselt Eestis"];

const searchLabelEng = ["Search", "Поиск", "Otsing"];
const sideParagraph1Eng = [
  "To see the difference between your and average wages you can fill the boxes below.",
  "Чтобы увидеть разницу между вашей и средней заработной платой, заполнитe поля ниже",
  "Oma ja keskmise palga erinevuse nägemiseks võite täita järgmised lahtrid.",
];
const sideParagraph2Eng = [
  "After selecting county from the map, you can search for a job by job title.",
  "После выбора региона на карте, вы можете выбрать профессию",
  "Pärast kaardil piirkonna valimist saate valida töö",
];
const noDataLabelEng = [
  "No data for the selected occupation",
  "Нет данных по выбранной профессии",
  "Valitud ameti kohta andmed puuduvad",
];
const noDataEng = ["No data", "Нет данных", "Valitud ameti"];
const averageWageEng = ["Average Wage", "Средняя зарплата", "Keskmine palk"];
const medianWageEng = [
  "Median Wage",
  "Средняя зарплата (Медиана)",
  "Mediaanpalk",
];
const genderWageGapEng = [
  "Gender Wage Gap",
  "Разница в заработной плате",
  "Palkade erinevus",
];
const totalNumberOfEmployeesEng = [
  "Total number of full-time employees in Estonia ",
  "Общее количество сотрудников в Эстонии",
  "Täisajaga töötavate töötajate koguarv Eestis",
];
const totalNumberOfEmployeesOccupationEng = [
  ["Total number of employees in occupation ", " in "],
  ["Общее количество работников по профессии ", ""],
  ["Tööga hõivatud töötajate koguarv ", ""],
];
const averageDataSpecEng = [
  ["Average for occupation", "Average for county"],
  ["Средний по профессии", "Средний по региону"],
  ["Keskmine hõivatus", "Maakonna keskmine"],
];
const computarizationEng = [
  [
    "high risk of computerization",
    "medium risk of computerization",
    "low risk of computerization",
  ],
  [
    "высокий риск компьютеризации",
    "средний риск компьютеризации",
    "низкий риск компьютеризации",
  ],
  [
    "suur arvutistamise oht",
    "keskmine arvutistamise oht",
    "madal arvutistamise oht",
  ],
];
const retirementEng = [
  [
    "high replacements needs due to retirement",
    "medium replacements needs due to retirement",
    "low replacements needs due to retirement",
  ],
  [
    "высокая потребность в замене из-за выхода на пенсию",
    "средняя потребность в замене из-за выхода на пенсию",
    "низкая потребность в замене из-за выхода на пенсию",
  ],
  [
    "pensionist tingitud suured asendamisvajadused",
    "pensionist tulenevad keskmised asendamisvajadused",
    "pensionile jäämise tõttu madalad asendamisvajadused",
  ],
];
const pensionLabelEng = [
  [
    "Estimated wage in 2030 for occupation is between",
    "and",
    "The risk of computerization for this occupation is",
    "and the replacements needs due to retirement are",
  ],
  [
    "Расчетная заработная плата в 2030 году для профессии между",
    "и",
    "Риск компьютеризации для этой профессии",
    "и потребности в заменах из-за выходa на пенсию",
  ],
  [
    "Eeldatav töötasu suurus 2030. aastal on okupatsiooni ajal vahemikus",
    "ja",
    "Selle okupatsiooni arvutistamise oht on",
    "ja asendajad vajavad pensionile jäämine on ",
  ],
];
const lessMoreLabelEng = [
  ["Higher than", "Less than"],
  ["Выше чем", "Mеньше чем"],
  ["Kõrgem kui", "vähem kui"],
];
const levelsEng = [
  ["low", "medium", "high"],
  ["низкий", "средний", "высокий"],
  ["madal", "keskmine", "kõrge"],
];
const ageLabelEng = [
  "Age distribution of employees.",
  "Возрастное распределение работников",
  "Töötajate vanuseline jaotus.",
];
const noInformationLabelEng = [
  "There is no information available for this occupation in this region. Please choose another county or another occupation. Average for Estonia is shown.",
  "Информация об этой профессии в данном регионе недоступна. Выберите другой округ или другое занятие. Показано среднее значение по Эстонии.",
  "Selle ametikoha kohta selles maakonnas infot ei ole. Palun vali teine maakond või teine amet. ",
];
const allOcupationsLabelEng = [
  "All occupations",
  "Все профессии",
  "Kõik ametialad",
];
const fullTimeEng = ["Full time", "На постоянной основе", "Täisajaga"];
const newsletterEng = [
  "Subscribe to newsletter",
  "Подписаться на новостную рассылку",
  "Telli uudiskiri",
];
const copyrightLabelEng = [
  "Copyright palgakompass.stat.ee. All Rights Reserved",
  "Авторские права palgakompass.stat.ee. Все права защищены",
  "Autoriõigus palgakompass.stat.ee. Kõik õigused kaitstud.",
];
const statisticalDbLabelEng = [
  "Statistical database",
  "Статистическая база данных",
  "Statistika Andmebaas",
];
const dashboardsLabelEng = ["Dashboards", "Дашборды", "Juhtimislauad"];
const treeOfTruthLabelEng = ["Tree of truth", "Древо истины", "Tõetamm"];
const mapApplicationEng = [
  "Statistics map application",
  "Приложение статистической карты",
  "Statistika kaardirakendus",
];
const foreignTradeEng = [
  "Foreign trade application",
  "Внешнеторговое приложение",
  "Väliskaubanduse rakendus",
];

const wageSalaryEng = [
  "Wages and salaries application",
  "Заявление о заработной плате",
  "Ametipalkade rakendus"
]

const nameStatisticsEng = [
  "Name statistics application",
  "Приложение статистики имен",
  "Nimede statistika rakendus"
]

const statisticsEstoniaEng = [
  "Statistics Estonia:",
  "Статистическое управление Эстонии:",
  "Statistikaamet:"
]

const replacementNeeds1Eng = [
  "Replacement rate in relation to the employee’s last wage",
  "Ставка замещения по отношению к последней заработной плате работника",
  "Asendusmäär töötaja viimase palga suhtes"];

const replacementNeeds2Eng =  ["Replacement rate in relation to the average wage in Estonia at the time of retirement","Коэффициент замещения по отношению к средней заработной плате в Эстонии при выходе на пенсию","Asendusmäär Eesti keskmise palga suhtes pensionile minemise hetkel"];


const pensionDescriptionEng =  [["It is assumed that:",
 "1) the distribution of the gross wages includes all occupations and reflects the current wage distributions of men and women in Estonia",
 "2) the date of birth of all employees is January 1, 2002; all the employees start working on January 1, 2020 and they all retire on November 1, 2071; no one has any interruptions in working and no one has children.",
 "3) all employees have joined the second pillar from the moment they start working, but no money is transferred to the supplementary pension funds (e.g. III pillar)",
 "4) the expected wage growth comes from prognoses of the Ministry of Finance, life expectancy in the future comes from the prognoses of Eurostat.",
],["Предполагается, что:",
"1) распределение валовой заработной платы включает все профессии и отражает текущее распределение заработной платы мужчин и женщин в Эстонии.",
"2) дата рождения всех работников - 1 января 2002 года; все сотрудники приступают к работе с 1 января 2020 года и все выходят на пенсию с 1 ноября 2071 года; ни у кого нет перерывов в работе и ни у кого нет детей.",
"3) все сотрудники присоединились ко второй ступени с момента начала работы, но деньги в дополнительные пенсионные фонды не поступают (например, III ступень)",
"4) ожидаемый рост заработной платы исходит из прогнозов Минфина, продолжительность жизни в будущем исходит из прогнозов Евростата."],
["Eeldame, et", "1) brutopalkade jaotus hõlmab kõiki ametialasid ning vastab kogu Eesti naiste ja meeste palkade jaotusele.",
"2) Kõik inimesed on sündinud 01. jaanuaril 2002. aastal, alustavad töötamist 1. jaanuaril 2020. aastal ja jäävad pensionile 1. novembril 2071. aastal. Mitte kellelgi ei ole töötamises katkestusi, kellelgi pole ka lapsi.",
"3) Kõik inimesed on liitunud II sambaga töötamise alustamise hetkel, mitte keegi pole liitunud III sambaga.",
"4) Eeldatav palgakasv on võetud Rahandusministeeriumi prognoosist, eeldatav eluiga pensionile minemise hetkel  ja eeldatav eluiga pensionile minemisel on võetud Eurostati prognoosist."]]


const gapsWageLabelEng = 
  ["Wage Gap","Разница в заработной плате","Palgalõhe"];


const gapsPensionLabelEng = 
  ["Pension Gap","Разница в пенсии","Pensionilõhe"];

const submittedLabelEng = [
  "Message Submitted",
  "Сообщение отправлено",
  "Sõnum on esitatud"
]

const submitLabelEng = [
  "Submit",
  "Отправить",
  "Saada"
]

const ageTickLabelEng = [
  "Age",
  "Возраст",
  "Vanus"
]

const propsLabelEng = [
  "Prop",
  "Реквизит",
  "Rekvisiidid"
]

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
  noInformationLabel = noInformationLabelEng[i];
  allOcupationsLabel = allOcupationsLabelEng[i];
  fullTime = fullTimeEng[i];
  newsletter = newsletterEng[i];
  copyrightLabel = copyrightLabelEng[i];
  statisticalDbLabel = statisticalDbLabelEng[i];
  dashboardsLabel = dashboardsLabelEng[i];
  treeOfTruthLabel = treeOfTruthLabelEng[i];
  mapApplication = mapApplicationEng[i];
  foreignTrade = foreignTradeEng[i];
  wageSalary = wageSalaryEng[i];
  nameStatistics = nameStatisticsEng[i];
  statisticsEstonia = statisticsEstoniaEng[i];
  pensionDescription = pensionDescriptionEng[i];
  replacementNeeds1 = replacementNeeds1Eng[i];
  replacementNeeds2 = replacementNeeds2Eng[i];
  gapsWageLabel = gapsWageLabelEng[i];
  gapsPensionLabel = gapsPensionLabelEng[i];
  submittedLabel = submittedLabelEng[i];
  submitLabel = submitLabelEng[i];
  ageTickLabel = ageTickLabelEng[i];
  propsLabel = propsLabelEng[i];
}

export let youtube = "https://www.youtube.com/channel/UCh3mRDb9k85oIZ-LREMCopA";
export let facebook = "https://www.facebook.com/Vordsetevoimalustevolinik";
export let instagram = "https://www.instagram.com/vordsetevoimalustevolinik/";
export let linkedin =
  "https://www.linkedin.com/company/statistikaamet-statistics-estonia/";
export let twitter = "https://twitter.com/eestistatistika";
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
export let totalNumberOfEmployeesOccupation =
  totalNumberOfEmployeesOccupationEng[0];
export let averageDataSpec = averageDataSpecEng[0];
export let computarization = computarizationEng[0];
export let retirement = retirementEng[0];
export let pensionLabel = pensionLabelEng[0];
export let lessMoreLabel = lessMoreLabelEng[0];
export let levels = levelsEng[0];
export let ageLabel = ageLabelEng[0];
export let noInformationLabel = noInformationLabelEng[0];
export let allOcupationsLabel = allOcupationsLabelEng[0];
export let fullTime = fullTimeEng[0];
export let newsletter = newsletterEng[0];
export let copyrightLabel = copyrightLabelEng[0];
export let statisticalDbLabel = statisticalDbLabelEng[0];
export let dashboardsLabel = dashboardsLabelEng[0];
export let treeOfTruthLabel = treeOfTruthLabelEng[0];
export let mapApplication = mapApplicationEng[0];
export let foreignTrade = foreignTradeEng[0];
export let nameStatistics = nameStatisticsEng[0];
export let wageSalary = wageSalaryEng[0];
export let statisticsEstonia = statisticsEstoniaEng[0];
export let pensionDescription = pensionDescriptionEng[0];
export let replacementNeeds1 = replacementNeeds1Eng[0];
export let replacementNeeds2 = replacementNeeds2Eng[0];
export let gapsWageLabel = gapsWageLabelEng[0];
export let gapsPensionLabel = gapsPensionLabelEng[0];
export let submittedLabel = submittedLabelEng[0];
export let submitLabel = submitLabelEng[0];
export let ageTickLabel = ageLabelEng[0];
export let propsLabel = propsLabelEng[0];
