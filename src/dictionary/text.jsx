import { methodologyEng, wageDifferencesTextEng,wageForecastTextEng,PensionsTextEng,LivelihoodEng } from "./textMethodology";

export const API_URL = "http://inwege-api.cloud.ut.ee/api";
export const menColor = "#3F1A84";
export const womenColor = "#F58FA9";
const averageEng = [
  "Average in Estonia for ",
  "Среднее по Эстонии для ",
  "Keskmine palk Eestis ametialal",
];
const salaryEng = [
  ["your", "wage"],
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
    " on average.",
  ],
  [
    "Мужчины зарабатывают на ",
    " больше, чем ",
    " меньше, чем",
    "",
    " женщины",
    " мужчины",
    "Вы зарабатываете на",
    " в среднем.",
  ],
  [
    "Mehed teenivad ",
    " rohkem kui ",
    " vähem kui ",
    "",
    " naised",
    " mehed",
    "Sina teenid",
    " keskmiselt",
  ],
];
const lngEng = ["en", "ru", "es"];
const tabsEng = [
  ["Wage comparison", "Wage projection", "Pension projection", "Background"],
  ["Разница в зарплате", "Прогноз по зарплате", "Прогноз по пенсии", "Пояснения"],
  ["Palgavõrdlus", "Palgaprognoos", "Pensioniprognoos", "Selgitused"],
];
const averagesEng = [
  ["Occupation ", " county", "Overall in Estonia"],
  [" По профессии", "По ", "Среднее по Эстонии"],
  ["Kogu ametiala", "Kogu maakond", "Kogu Eesti"],
];
const mainEng = [
  ["Home", "About", "Contacts", "Navigation"],
  ["Главная", "О ", "Контакты", "Навигация по сайту"],
  ["Kodu", "Meist", "Kontaktid", "Navigeerimine"],
];
const genderEng = [
  ["Males", "Females"],
  ["Мужчины", "Женщины"],
  ["Mehed", "Naised"],
];
const selectRegionEng = ["Select region", "Выберите регион", "Vali maakond"];
const selectOccupationEng = [
  "SEARCH",
  "ПОИСК",
  "OTSI",
];
const averageBetweenMenAndWomenEng = [
  "Average wages of males and females working full-time",
  "Средняя зарплата у мужчин и женщин, работающих на полную занятость",
  "Täisajaga töötavate meeste ja naiste keskmine palk",
];

const leaveAFeedBackEng = [
  "Leave a feedback!",
  "Оставьте отзыв!",
  "Saada tagasiside siit!",
];
const averageDataEng = [
      "Overall in Estonia",
      "По Эстонии",
      "Kogu Eesti",
    ];


const smallAverageDataEng =  [
  "overall Estonia",
  "по Эстонии",
  "kogu Eesti",
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
const defaultGenderEng = ["GENDER", "ПОЛ", "SUGU"];
const occupationSelectorPlaceholderEng = [
  "First select a county on the map",
  "Выберите уезд на карте",
  "Esmalt tuleb kaardilt valida maakond",
];
const overallEng = ["Overall in Estonia", "По Эстонии", "Kogu Eesti"];

const searchLabelEng = ["Search", "Поиск", "Otsing"];
const sideParagraph1Eng = [
  "Fill in the fields to compare your wage to average gross wages on the distributions graph.",
  "Чтобы увидеть разницу между вашей и средней брутто-заработной платой, заполнитe поля ниже.",
  "Täida lahtrid, et jaotuste joonisel võrrelda oma palka keskmise brutopalgaga.",
];
const sideParagraph2Eng = [
  ["Select county on the map.", "Select occupation"],
  ["Выберите уезд на карте.", "Выберите профессию"],
  ["Vali kaardil maakond.", "Vali amet."],
];
const noDataLabelEng = [
  "No data for the selected occupation.",
  "Нет данных по выбранной профессии.",
  "Valitud ameti kohta andmed puuduvad.",
];
const noDataEng = ["No data", "Нет данных", "Andmed puuduvad"];
const averageWageEng = ["Average wage", "Средняя зарплата", "Keskmine palk"];
const medianWageEng = [
  "Median wage",
  "Медианная зарплата",
  "Mediaanpalk",
];
const genderWageGapEng = [
  "Difference in males’ and females’ monthly wages",
  "Разница в месячной зарплате у мужчин и женщин",
  "Meeste ja naiste kuupalga erinevus",
];

const totalNumberOfEmployeesEng = [
  "Total number of full-time employees",
  "Общее количество работников на полную занятость",
  "Täisajaga töötajate koguarv",
];
const  totalNumberOfEmployeesOccupationEng = [
  ["Total number of full-time employees ", " "],
  ["Общее количество работников на полную занятость ", ", "],
  ["Täisajaga töötajate koguarv ", ", "],
];
const averageDataSpecEng = [
  ["Occupation", "Over County"],
  ["По профессии", "По уезду"],
  ["Kogu ametiala", "Maakond"],
];
const columnChartOccupationLabelEng = [
  ["", "County"],
  ["По", ""],
  ["Kogu", "maakond"],
];
const computarizationEng = [
  [
    "High risk of computerisation",
    "Medium risk of computerisation",
    "Low risk of computerisation",
  ],
  [
    "Высокий риск компьютеризации",
    "Средний риск компьютеризации",
    "Низкий риск компьютеризации",
  ],
  [
    "Suur tõenäosus, et inimese asendab arvuti",
    "Keskmine tõenäosus, et inimese asendab arvuti",
    "Väike tõenäosus, et inimese asendab arvuti",
  ],
];
const retirementEng = [
  [
    "High age-related replacement need",
    "Medium age-related replacement need",
    "Low age-related replacement need",
  ],
  [
    "Высокая потребность в замене из-за выхода на пенсию",
    "Средняя потребность в замене из-за выхода на пенсию",
    "Низкая потребность в замене из-за выхода на пенсию",
  ],
  [
    "Suur asendusvajadus vanuse tõttu",
    "Keskmine asendusvajadus vanuse tõttu",
    "Väike asendusvajadus vanuse tõttu",
  ],
];
const pensionLabelEng = [
  [
    "In 2030, the projected wage for this occupation is between",
    "–",
    "The risk of computerisation for this occupation is",
    "and the age-related replacement need is ",
  ],
  [
    "В 2030 году прогнозируемая брутто-зарплата по этой профессии составит ",
    "–",
    "Риск компьютеризации для этой профессии",
    "и потребность в замене из-за выходa на пенсию",
  ],
  [
    "Aastal 2030 on sellel ametialal prognoositav brutotöötasu ",
    "–",
    "Sellel ametialal on",
    "risk, et inimese asendab arvuti ja vanusest tingitud asendusvajadus on ",
  ],
];
const lessMoreLabelEng = [
  ["", "Less than", "or more"],
  ["Выше", "Ниже", ""],
  ["Vähemalt", "Alla", ""],
];
const levelsEng = [
  ["low", "medium", "high"],
  ["низкий", "средний", "высокий"],
  ["väike", "keskmine", "suur"],
];
const ageLabelEng = [
  "Age distribution in occupation",
  "Распределение по возрастам среди работников данной профессии",
  "Ametiala vanuseline jaotus",
];
const noInformationLabelEng = [
  "There is no information available for this occupation in this region. Please choose another county or another occupation. Average for Estonia is shown.",
  "Информация о разнице в зарплатах у мужчин и женщин по этой профессии недоступна. Смотрите медианную зарплату или среднюю зарплату.",
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
  "Copyright palk.stat.ee. All Rights Reserved",
  "Авторские права palk.stat.ee. Все права защищены",
  "Autoriõigus palk.stat.ee. Kõik õigused kaitstud.",
];
const statisticalDbLabelEng = [
  "Statistical database",
  "Статистическая база данных",
  "Statistika andmebaas",
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
  "Приложение по внешней торговле",
  "Väliskaubanduse rakendus",
];

const wageSalaryEng = [
  "Wages and salaries application",
  "Приложение по заработной плате",
  "Ametipalkade rakendus"
]

const nameStatisticsEng = [
  "Name statistics application",
  "Приложение статистики имен",
  "Nimede statistika rakendus"
]

const statisticsEstoniaEng = [
  "Statistics Estonia:",
  "Департамент статистики Эстонии:",
  "Statistikaamet:"
]

const replacementNeeds1Eng = [
  "Replacement rate in relation to employee’s last wage",
  "Kоэффициент замещения по отношению к последней заработной плате работника",
  "Asendusmäär töötaja viimase palga alusel"];

const webpageLabelEng = [
  "Webpage",
  "Домашняя страница",
  "Palgarakendus"
]

const foundationLabelEng = [
  "This project was funded by Horizon 2020, the European " +
  "Union’s Rights, Equality and Citizenship Program " +
  "(2014–2020).",
  "Данный проект финансируется в рамках программы Европейского союза по правам, равноправию и гражданству (2014–2020)",
  "Projekti on rahastatud EL-i õiguste, võrdõiguslikkuse ja kodakondsuse programmist (2014–2020)",
]


const wageChangeInfoEng = [
  "To see the difference, please check the graph",
  "Чтобы увидеть разницу, посмотрите график",
  "Erinevuse nägemiseks kontrollige palun graafikut"
]

const noDataInfoEng = [
  "For this occupation, there is no information on wage differences between men and women. See the median wage or average wage.",
  "Информация о разнице в зарплатах у мужчин и женщин по этой профессии недоступна. Смотрите медианную зарплату или среднюю зарплату.",
  "Sellel ametialal ei ole infot meeste ja naiste palgaerinevuse kohta, vaata mediaanpalka või keskmist palka."
]

const quarterEng = [
  "quarter",
  "квартал",
  "kvartal"
]


const replacementNeeds2Eng =  ["Replacement rate in relation to average wage in Estonia at the time of retirement","Коэффициент замещения по отношению к средней заработной плате по Эстонии при выходе на пенсию","Asendusmäär Eesti keskmise palga alusel pensionile minemise hetkel"];


let pensionDescriptionEng =  [["The above applies when the following simple assumptions are used in the calculations:",
  "The distribution of gross wages includes all occupations and reflects the wage distributions of men and women in Estonia.",
  "The date of birth of all employees is 1 January 2002. They all start working on 1 January 2020 and retire on 1 November 2071. No one has any interruptions in working or any children.",
  "All employees have joined the second pillar from the moment they start working, but no one has joined the third pillar.",
  "The expected wage growth is from the projections of the Ministry of Finance, life expectancy at the time of retirement is from Eurostat projections.",
],["При расчетах предполагается следующее:",
  "распределение брутто-зарплаты охватывает все профессии и отражает текущее распределение заработной платы у мужчин и женщин в Эстонии.",
  "все родившиеся 1 января 2002 года приступят  к работе с 1 января 2020 года и выйдут на пенсию с 1 ноября 2071 года, никто не прерывал трудовую деятельность и ни у кого нет детей.",
  "все сотрудники присоединились ко второй пенсионной ступени с момента начала работы и никто не присоединился к III пенсионной ступени.",
  "предполагаемый рост заработной платы исходит из прогнозов Министерства финансов, ожидаемая продолжительность жизни при выходе на пенсию исходит из прогнозов Евростат."],
  ["See kehtib, kui arvutuste tegemiseks kasutatakse alljärgnevaid lihtsustatud eeldusi:", "brutopalkade jaotus hõlmab kõiki ametialasid ning vastab kogu Eesti naiste ja meeste palgajaotusele;",
    "kõik on sündinud 1. jaanuaril 2002, alustavad töötamist 1. jaanuaril 2020 ja jäävad pensionile 1. novembril 2071. Kellelgi ei ole töötamises katkestusi ega ole lapsi;",
    "kõik on töötamise alustamise ajal liitunud teise pensionisambaga, keegi pole liitunud kolmanda sambaga;",
    "eeldatav palgakasv on võetud rahandusministeeriumi prognoosist, eeldatav eluiga pensionile minemise ajal on võetud Eurostati prognoosist."]];


const gapsWageLabelEng =
["Difference in males’ and females’ monthly wages | in euros of 2020","Разница в заработной плате у мужчин и женщин | 2020 год, в евро","Meeste ja naiste kuupalga erinevus | 2020 aasta eurodes"];


let gapsPensionLabelEng =
  ["Difference in males’ and female’s pensions | in euros of 2071","Разница в пенсии у мужчин и женщин  | 2071 год, в евро","Meeste ja naiste pensioni erinevus | 2071. aasta eurodes"];

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
  "Share (%)",
  "Пропорции (%)",
  "Osatähtsus (%)"
]

const emailLabelEng = [
  "Email",
  "Электронная почта",
  "E-POSTI AADRESS"
]

const occupationLabelEng = [
  "Occupation *",
  "По профессии *",
  "Kogu ametiala *"
]

const countyLabelEng = [
  "County",
  "Pегион",
  "Maakond"
]

const decileLabelEng = [
  "Decile-based estimation of frequency (%)",
  "Частота на основе децилей (%)",
  "Detsiilide põhjal hinnatud sagedus (%)"
]

const  checkMyPlanLabelEng = [
  "Pension calculator",
  "Калькулятор",
  "Pensionikalkulaator"
]

const downloadJpegEng = [
  "Download JPEG",
  "Скачать JPEG",
  "Laadi alla JPEG"
]

const downloadPngEng = [
  "Download PNG",
  "Скачать PNG",
  "Laadi alla PNG"
]

let pensionDifferenceLabel2020Eng = [
  ["In 2020, ","In 2071, ", "the average monthly wages of men are ", "the average pension of men is ", " higher ", " lower ", "than the average wages of women.", "than the average pension of women."],
  ["В 2020 году ", "В 2071 году ", "средняя заработная плата мужчин на ", "средняя пенсия мужчин на ", " выше", " ниже", ", чем у женщин.", ", чем пенсия у женщин."],
  ["В 2020 году ", "В 2071 году ", "средняя заработная плата мужчин на ", "средняя пенсия мужчин на ", " выше", " ниже", ", чем у женщин.", ", чем пенсия у женщин."],
  ["Aastal 2020 ", "Aastal 2071 ", "on meeste kuupalk keskmiselt ", "on meeste pension keskmiselt ", " suurem ", " väiksem ", "kui naiste kuupalk.", "kui naiste pension."]
]

let pensionFractionLabelEng = [
  ["The ratio of pension to the last monthly wage for men is on average ", "The ratio of pension to average gross wages in the year of retirement for men is on average ", " percentage points ", "higher ", "lower ", "than for women.  "],
  ["Доля пенсии мужчин от средней брутто-зарплаты в год выхода на пенсию в среднем на "," процента больше "," процента меньше ",", чем у женщин", "Доля пенсии мужчин от последней месячной зарплаты в среднем на "],
  ["Meeste pensioni osatähtsus viimasest kuupalgast on keskmiselt  ", "Meeste pensioni osatähtsus keskmisest palgast pensionile minemise aastal on keskmiselt ", " protsendipunkti ", "suurem ", "väiksem ", "kui naistel."]
]

const pensionHeaderEng = [
  ["Over time, the ", " difference in men's and women's monthly wages becomes a ", " difference in pensions, not disappearing."],
  ["Разница в ", "в ежемесячной заработной плате мужчин и женщин со временем станет разницей в ", " в размере пенсий, но не исчезнет."],
  ["Meeste ja naiste kuupalkade erinevus on ", "mis ajapikku muutub pensionide erinevuseks ", ", aga ei kao. "]]

const euroUnitsEng = ["euros", "евро", "eurot"];

const columnchartLabelEng = ['Average gross wages', ' Средняя месячная брутто-зарплата', 'Keskmine brutokuupalk'];

const workingWomenEng = ["Female employees", "работающих женщин", "töötavaid naisi"];
const workingMenEng = ["Male employees", "работающих мужчин", "töötavaid mehi "];
const joinEng = ["Subscribe", "Присоединиться", "Liitu"];
const joinBodyEng = ["By subscribing, you agree to our privacy policy.","Подписываясь на рассылку, вы соглашаетесь с условиями и политикой конфиденциальности.","Liitudes uudiskirjaga, nõustud meie privaatsustingimustega."]
const joinLinkEng = ["Read about data protection (privacy policy).", "Наша политика конфиденциальности", "Statistikaameti privaatsustingimused"]
const sourceEng = ["Source: Statistics Estonia","Источник: Департамент статистики","Allikas: statistikaamet"]
const monthLabelEng = ["month", "в месяц","kuus"]
const wageGapTabInfoEng= ["The difference between the average wages of males and females divided by the average wages of males. Covers full-time employees. 2.5% of the lowest and highest wages of both sexes are excluded.",
  "Разница между средней заработной платой мужчин и женщин, поделенная на среднюю заработную плату мужчин. Исключаются работающие на полную ставку обоих полов 2,5% от самой низкой и самой высокой заработной платы.",
"Meeste ja naiste keskmise palga vahe, mis on jagatud meeste keskmise palgaga. Täistööajaga töötajad, mõlema soo kõige madalamatest ja kõige kõrgematest palkadest 2,5% on välja jäetud."]
const medianTabInfoEng = ["A payment from which half the people earn more and half earn less. Covers full-time employees and 2.5% of the lowest and highest wages are excluded.",
  "Сумма, больше и меньше которой зарабатывает одинаковое количество работающих. Работники, работающие на полную ставку, без учета 2,5% от самых низких и самых высоких заработных плат.",
"Väljamakse, millest teenitakse võrdselt rohkem ja vähem. Täistööajaga töötajad, välja on jäetud 2,5% kõige madalamatest ja kõige kõrgematest palkadest."]
const averageTabInfoEng = ["Arithmetic mean, i.e. the sum of all wages divided by the number of wage earners. Covers full-time employees. 2.5% of the lowest and highest wages are excluded.",
  "Среднее арифметическое, то есть сумма всех заработных плат, поделенная на количество работников, получающих заработную плату. Работающие на полную ставку, без учета 2,5% от самой низкой и самой высокой заработной платы.",
"Aritmeetiline keskmine ehk kõigi palkade summa, mis on jagatud palgasaajate arvuga. Täistööajaga töötajad, välja on jäetud 2,5% kõige madalamatest ja kõige kõrgematest palkadest."]
const noOccupationSelectedLabelEng = ["No county or profession selected.", "Не выбраны уезд или профессия.", "Maakonda ega ametiala ei ole valitud."]
const yearLabelEng = ["Year", "", "Aasta"]
const occupationDescriptionLabelEng = ["Occupation description", "Описание профессии", "Ametikirjeldus"]
const averageWageLabelEng = ["Average wages", "Средняя зарплата", "Keskmine palk"]
const levelLabelEng = [["The selected occupation belongs to the group of occupations","level ", " in the Classification of Occupations"],
  ["Выбранная профессия относится к группе","", "уровень по классификатору профессий"],
  ["Valitud ametinimetus kuulub ametirühma", "tase", "ametite klassifikaatoris"]]
const wageForecastOccupationSelectorPlaceholderEng = ["SELECT JOB TITLE","ВЫБЕРИТЕ ПРОФЕССИЮ","VALI AMETIALA"]
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
  occupationLabel = occupationLabelEng[i];
  countyLabel = countyLabelEng[i];
  emailLabel = emailLabelEng[i];
  checkMyPlanLabel = checkMyPlanLabelEng[i];
  pensionDifferenceLabel2020 = pensionDifferenceLabel2020Eng[i];
  pensionFractionLabel = pensionFractionLabelEng[i];
  columnchartLabel = columnchartLabelEng[i];
  pensionHeader = pensionHeaderEng[i];
  join = joinEng[i];
  joinBody = joinBodyEng[i];
  joinLink = joinLinkEng[i];
  workingWomen = workingWomenEng[i];
  workingMen = workingMenEng[i];
  webpageLabel = webpageLabelEng[i];
  PensionsText = PensionsTextEng[i];
  wageForecastText = wageForecastTextEng[i];
  wageDifferencesText = wageDifferencesTextEng[i];
  wageChangeInfo = wageChangeInfoEng[i];
  noDataInfo = noDataInfoEng[i];
  source = sourceEng[i];
  monthLabel = monthLabelEng[i];
  foundationLabel = foundationLabelEng[i];
  smallAverageData = smallAverageDataEng[i];
  decileLabel = decileLabelEng[i];
  quarter = quarterEng[i];
  wageGapInfoTab = wageGapTabInfoEng[i];
  averageTabInfo = averageTabInfoEng[i];
  medianTabInfo = medianTabInfoEng[i];
  noOccupationSelectedLabel = noOccupationSelectedLabelEng[i];
  wageForecastOccupationSelectorPlaceholder = wageForecastOccupationSelectorPlaceholderEng[i];
  columnChartOccupationLabel = columnChartOccupationLabelEng[i];
  averageWageLabel = averageWageLabelEng[i];
  yearLabel = yearLabelEng[i];
  levelLabel = levelLabelEng[i];
  occupationDescriptionLabel = occupationDescriptionLabelEng[i];
  euroUnits = euroUnitsEng[i];
  Livelihood =  LivelihoodEng[i];
  downloadJpeg = downloadJpegEng[i];
  downloadPng = downloadPngEng[i];
}

export let wageGapInfoTab = wageGapTabInfoEng[0];
export let averageTabInfo = averageTabInfoEng[0];
export let medianTabInfo = medianTabInfoEng[0];
export let levelLabel = levelLabelEng[0];
export let youtube = "https://www.youtube.com/channel/UCh3mRDb9k85oIZ-LREMCopA";
export let facebook = "https://www.facebook.com/Vordsetevoimalustevolinik";
export let instagram = "https://www.instagram.com/vordsetevoimalustevolinik/";
export let linkedin =
  "https://www.linkedin.com/company/statistikaamet-statistics-estonia/";
export let twitter = "https://twitter.com/eestistatistika";
export let pensionLink = "https://pension.sotsiaalkindlustusamet.ee/kalkulaator";
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
export let smallAverageData = smallAverageDataEng[0];
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
export let emailLabel = emailLabelEng[0];
export let occupationLabel = occupationLabelEng[0];
export let countyLabel = countyLabelEng[0];
export let checkMyPlanLabel = checkMyPlanLabelEng[0];
export let pensionDifferenceLabel2020 = pensionDifferenceLabel2020Eng[0];
export let pensionFractionLabel = pensionFractionLabelEng[0];
export let columnchartLabel = columnchartLabelEng[0];
export let pensionHeader = pensionHeaderEng[0];
export let join = joinEng[0];
export let joinBody = joinBodyEng[0];
export let joinLink = joinLinkEng[0];
export let workingWomen = workingWomenEng[0];
export let workingMen = workingMenEng[0];
export let webpageLabel = webpageLabelEng[0];
export let PensionsText = PensionsTextEng[0];
export let wageForecastText = wageForecastTextEng[0];
export let wageDifferencesText = wageDifferencesTextEng[0];
export let wageChangeInfo = wageChangeInfoEng[0];
export let noDataInfo = noDataInfoEng[0];
export let source = sourceEng[0];
export let monthLabel = monthLabelEng[0];
export let foundationLabel = foundationLabelEng[0];
export let decileLabel = decileLabelEng[0];
export let quarter = quarterEng[0];
export let noOccupationSelectedLabel = noOccupationSelectedLabelEng[0];
export let columnChartOccupationLabel = columnChartOccupationLabelEng[0];
export let wageForecastOccupationSelectorPlaceholder = wageForecastOccupationSelectorPlaceholderEng[0];
export let yearLabel = yearLabelEng[0];
export let averageWageLabel = averageWageLabelEng[0];
export let occupationDescriptionLabel = occupationDescriptionLabelEng[0];
export let euroUnits = euroUnitsEng[0];
export let Livelihood = LivelihoodEng[0];
export let downloadJpeg = downloadJpegEng[0];
export let downloadPng = downloadPngEng[0];

export let counties = {"Valga maakond": "Валгамаа",
  "Viljandi maakond": "Вильяндимаа",
  "Võru maakond": "Вырумаа",
  "Ida-Viru maakond":"Ида-Вирумаа",
  "Jõgeva maakond": "Йыгевамаа",
  "Lääne-Viru maakond":"Ляэне-Вирумаа",
  "Lääne maakond": "Ляэнемаа",
  "Põlva maakond" :"Пылвамаа",
  "Pärnu maakond" :"Пярнумаа",
  "Rapla maakond": "Рапламаа",
  "Saare maakond": "Сааремаа",
  "Tartu maakond": "Тартумаа",
  "Harju maakond" :"Харьюмаа",
  "Hiiu maakond" :"Хийумаа",
  "Järva maakond":"Ярвамаа"}



