const methodologyEng = [
  {
    header: "METHODOLOGY",

    description:
      "The application shows the gross earnings of employees registered in Estonia in the selected period. Data are taken from the employment register (TÖR) and annexes 1 and 2 of the Estonian tax declaration form TSD (declaration of income and social tax, unemployment insurance premiums and contributions to mandatory funded pension). The register data are used as follows: ",
    listItems: [
      " employees with a valid employment entry in the employment register at the end of the period;",
      "only entries stating the occupation of the employee (mandatory since July 2019) are included from the employment register;",
      "excluded are entries which are suspended at the end of the period or where the period of employment is shorter than 1 month;",
      "the application provides information about the most common occupation groups in Estonia. The remaining occupations are not shown separately but have been included under “All occupations;",
      "the average monthly gross earnings of an employee in the occupation are calculated on the basis of payments declared by the employer in the selected period in the tax declaration form TSD annexes 1 and 2;",
      "only income from work is taken into account when calculating the earnings of employees. For this, payment types 10, 12 and 13 of form TSD annex 1 and payment types 120, 121, 126, 127, 144, 145 of annex 2 are used;",
      "for calculating the number of employees, all persons with the same occupation are included, regardless of their work load or contract type;",
      "for calculating the median earnings and earnings distribution, full-time employees who have received income from work (i.e. income from work is greater than 0) are included;",
      "for calculating the median earnings, persons whose type of employment in the employment register is “Contract of employment”, “Civil service” or “Higher civil servant” are included.",
    ],
    itemsDescription:
      "The application shows the median gross earnings for the respective occupation. Median earnings are such that half of the employees in the occupation under consideration earn less and the other half earn more. For instance, median earnings of 1,000 euros means that half of those in the occupation earn less and half earn more than 1,000 euros per month. The earnings distribution figures do not include the top and bottom 2.5% earnings.",
  },
  {
    header: "МЕТОДИКА",
    description:
      "В приложении указана валовая заработная плата работников, зарегистрированных в Эстонии за выбранный период. Данные взяты из реестра занятости (TÖR) и приложений 1 и 2 эстонской налоговой декларации, формы TSD (декларация о доходах и социальном налоге, безработица). страховые взносы и взносы в обязательную накопительную пенсию). Данные регистра используются следующим образом:",
    listItems: [
      "работники, имеющие действительную запись о трудоустройстве в реестре занятости на конец периода;",
      "только записи о профессии работника (обязательны с июля 2019 года) включены в регистр занятости;",
      "исключены записи, которые приостановлены в конце периода или период занятости менее 1 месяца;",
      'Приложение предоставляет информацию о наиболее распространенных группах занятий в Эстонии. Остальные профессии не показаны отдельно, а включены в раздел " Все профессии "',
      "Среднемесячная начисленная заработная плата работника по профессии рассчитывается на основе выплат, заявленных работодателем за выбранный период в форме налоговой декларации в приложениях 1 и 2 ЦД;",
      "При расчете заработной платы работников учитывается только доход от работы. Для этого используются виды выплат 10, 12 и 13 формы TSD приложения 1 и виды выплат 120, 121, 126, 127, 144, 145 приложения 2 используются;",
      "для расчета численности работников включены все лица с одинаковой профессией, независимо от их рабочей нагрузки или типа контракта",
      "для расчета средней заработной платы и распределения заработной платы учитываются работники, занятые полный рабочий день, которые получили доход от работы (то есть доход от работы больше 0);",
      'для расчета средней заработной платы включены лица, чей вид работы в реестре занятости " Трудовой договор "," Государственная служба " или " Высший государственный служащий ".',
    ],
    itemsDescription:
      "Приложение показывает среднюю заработную плату брутто и зарплаты для соответствующей профессии. Средняя заработная плата такова, что половина работников рассматриваемой профессии зарабатывает меньше, а другая половина зарабатывает больше. Например, средняя заработная плата в 1000 евро означает, что половина занятых зарабатывает меньше, а половина зарабатывает более 1000 евро в месяц. Данные о распределении заработной платы не включают заработную плату в нижней и верхней части 2,5%.",
  },
  {
    header: "METOODIKA",
    description:
      "Rakenduses näidatakse Eestis registreeritud töötajate brutotöötasu valitud perioodil. Kasutatakse töötamise registri (TÖR) ja maksudeklaratsiooni TSD (tulu- ja sotsiaalmaksu, kohustusliku kogumispensioni makse ja töötuskindlustusmakse deklaratsioon) lisade 1 ja 2 andmeid. Registrite väljavõte on tehtud järgmistel tingimustel:",
    listItems: [
      "töötajad, kellel oli töötamise registris kehtiv töötamise kirje perioodi lõpu seisuga;",
      "arvesse võetakse vaid need TÖR-i kirjed, kus on märgitud töötaja ametinimetus (kohustuslik alates juulist 2019);",

      "välja on jäetud kirjed, mis on perioodi lõpu seisuga peatatud või kus töötamise aeg on lühem kui 1 kuu;",

      "rakenduses esitatakse info Eestis enam levinud ametirühmade kohta. Ülejäänud ameteid eraldi ei esitata, kuid need on arvesse võetud vaates „Kõik ametid“;",

      "töötaja kuine keskmine brutopalk ametikohal arvutatakse välja valitud perioodi jooksul tööandja deklareeritud maksudeklaratsiooni TSD lisade 1 ja 2 väljamakse summade põhjal;",

      "töötajate palga arvutamisel võetakse arvesse vaid töine tulu. Selleks kasutatakse TSD lisa 1 väljamakse liike 10, 12 ja 13 ning lisa 2 väljamakse liike 120, 121, 126, 127, 144, 145;",

      "töötajate arvu leidmisel võetakse arvesse kõik sellel ametikohal töötavad inimesed olenemata nende töökoormusest ja lepingu liigist;",

      "mediaanpalga ja palgajaotuse leidmisel võetakse arvesse töötajad, kes töötavad täiskohaga ning kes on saanud töist tulu (s.t töine tulu on nullist suurem);",

      "mediaanpalga leidmisel võetakse arvesse inimesed, kelle töötamise liigiks on TÖR-is märgitud „Tööleping“, „Avalik teenistus“ või „Kõrgem riigiteenija“.",
    ],
    itemsDescription:
      "Rakenduses näidatakse vastava ametikoha mediaantöötasu, s.t töötasu, millest rohkem ja millest vähem teenivaid töötajaid on sellel ametikohal ühepalju. Näiteks tähendab mediaantöötasu 1000 eurot, et pooled sellel ametikohal töötavad inimesed teenivad alla ja pooled üle 1000 euro kuus. Palgajaotuse joonistel ei näidata 2,5% kõige madalamaid ja 2,5% kõige kõrgemaid töötasusid.",
  },
];

export const wageDifferencesTextEng = [
  "The earnings application shows differences in the monthly gross earnings of full-time employees by sex, county and occupation. For information about an occupation in Estonia as a whole, click on “Overall in Estonia“ below the map title. For further information, select „Background“ from the main menu.",
  "В приложении по заработной плате представлена информация о ежемесячной брутто-зарплате сотрудников, занятых полный рабочий день, в разбивке по полу, региону и профессиям. Данные о профессии по всей Эстонии можно получить нажав на словосочетание «По Эстонии» под заголовком карты. Подробнее читайте выбрав в меню «Пояснения».",
  'Rakendus näitab täistööajaga töötajate kuise brutotöötasu erinevust soo, maakondade ning ametialade kaupa. Näitajad põhinevad registriandmetel. Ametiala kohta kogu Eestis saab infot, kui klõpsata kaardil pealkirja all sõnapaaril „Kogu Eesti“. Loe täpsemalt menüüst "Selgitused".',
];
export const wageForecastTextEng = [
  "If the earnings in each occupation were to grow at the same pace as before 2019 and if the total earnings growth in all occupations followed the long-term projections of the Ministry of Finance, the earnings in 2030 would be at the level shown in the table below. In any given occupation, the more there are people in these jobs who retire, the easier it is to find work in that occupation. In the more distant future, robots and computers may replace humans in several occupations.",
  "Если зарплаты всех профессий будут расти в том же темпе, что и до 2019 года, и рост всех зарплат будет соответствовать долгосрочному прогнозу министерства финансов, то к 2030 году зарплаты будут такими, как показано в таблице ниже. Проще найти работу по профессии, если в этой профессии многие уходят на пенсию. В более далеком будущем в некоторых профессиях работу людей будут выполнять роботы и компьютеры.",
  "Kui ametialade palgad kasvaksid sama tempoga nagu enne 2019. aastat ning kõigi ametialade palgakasv kokku oleks kooskõlas  rahandusministeeriumi pikaajalise prognoosiga, siis oleks palgad 2030. aastal nii suured, nagu on märgitud alljärgnevas tabelis. Ametialal on seda lihtsam tööd leida, mida rohkem on sellel alal pensionile jääjaid. Kaugemas tulevikus võivad hakata mõnel ametialal inimeste eest tööd tegema robotid ja arvutid.",
];
export const PensionsTextEng = [
  "The size of a person’s pension is linked to his or her working-age earnings through the pension insurance component, joint component and payments into the second pillar. One year of employment is added in the case of persons who earn at least the minimum wage for a whole year. This means that the current gender differences in earnings would extend into the future even if the duration of employment is the same.",
  "Размер пенсии связан с зарплатой времен трудоспособного возраста через страховую часть, объединенную часть и взносы вo вторую ступень. Один год трудового стажа прибавляется тем, кто в течение всего года зарабатывают по меньшей мере минимальную зарплату. Это означает, что существующие гендерные различия перенесутся в будущее даже при равном трудовом стаже.",
  "Pensioni suurus on seotud tööea palgaga pensioni kindlustusosa, ühendosa ja teise samba sissemaksete kaudu. Üks aasta tööstaaži lisandub neile, kes teenivad terve aasta jooksul vähemalt miinimumpalka. See tähendab, et praegused soolised palgaerinevused kanduksid tulevikku üle isegi võrdse tööstaaži korral.",
];
export const LivelihoodEng =  [
  "The 16.9% difference in monthly earnings between men and women will change to a 9.5% pension gap over time, but will not disappear.",
  "Разница в 16,9% в ежемесячной заработной плате мужчин и женщин со временем изменится на 9,5%, но не исчезнет.",
  "Meeste ja naiste 16,9%-line kuupalkade erinevus muutub ajapikku 9,5%-liseks pensionide erinevuseks, aga ära ei kao.",
];


export { methodologyEng };
