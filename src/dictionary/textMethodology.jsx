const methodologyEng = [{
  header: "METHODOLOGY",

  description:
    "The application shows the gross wages and salaries of employees registered in Estonia in the selected period. Data are taken from the employment register (TÖR) and annexes 1 and 2 of the Estonian tax declaration form TSD (declaration of income and social tax, unemployment insurance premiums and contributions to mandatory funded pension). The register data are used as follows: ",
  listItems: [
    " employees with a valid employment entry in the employment register at the end of the period;",
    "only entries stating the occupation of the employee (mandatory since July 2019) are included from the employment register;",
    "excluded are entries which are suspended at the end of the period or where the period of employment is shorter than 1 month;",
    "the application provides information about the most common occupation groups in Estonia. The remaining occupations are not shwn separately but have been included under “All occupations;",
    "the average monthly gross wages and salaries of an employee in the occupation are calculated on the basis of payments declared by the employer in the selected period in the tax declaration form TSD annexes 1 and 2;",
    "only income from work is taken into account when calculating the wages and salaries of employees. For this, payment types 10, 12 and 13 of form TSD annex 1 and payment types 120, 121, 126, 127, 144, 145 of annex 2 are used;",
    "for calculating the number of employees, all persons with the same occupation are included, regardless of their work load or contract type;",
    "for calculating the median wage and wage distribution, full-time employees who have received income from work (i.e. income from work is greater than 0) are included;",
    "for calculating the median wage, persons whose type of employment in the employment register is “Contract of employment”, “Civil service” or “Higher civil servant” are included.",
  ],
  itemsDescription:
    "The application shows the median gross wages and salaries for the respective occupation. Median wage is such that half of the employees in the occupation under consideration earn less and the other half earn more. For instance, a median wage of 1,000 euros means that half of those in the occupation earn less and half earn more than 1,000 euros per month. The wage distribution figures do not include the wages and salaries in the bottom and top 2.5%.",
},{
  header: "МЕТОДИКА",
  description: "В приложении указана валовая заработная плата работников, зарегистрированных в Эстонии за выбранный период. Данные взяты из реестра занятости (TÖR) и приложений 1 и 2 эстонской налоговой декларации, формы TSD (декларация о доходах и социальном налоге, безработица). страховые взносы и взносы в обязательную накопительную пенсию). Данные регистра используются следующим образом:",
  listItems: [
    "работники, имеющие действительную запись о трудоустройстве в реестре занятости на конец периода;",
    "только записи о профессии работника (обязательны с июля 2019 года) включены в регистр занятости;",
    "исключены записи, которые приостановлены в конце периода или период занятости менее 1 месяца;",
    "Приложение предоставляет информацию о наиболее распространенных группах занятий в Эстонии. Остальные профессии не показаны отдельно, а включены в раздел \" Все профессии \"",
    "Среднемесячная начисленная заработная плата работника по профессии рассчитывается на основе выплат, заявленных работодателем за выбранный период в форме налоговой декларации в приложениях 1 и 2 ЦД;",
    "При расчете заработной платы работников учитывается только доход от работы. Для этого используются виды выплат 10, 12 и 13 формы TSD приложения 1 и виды выплат 120, 121, 126, 127, 144, 145 приложения 2 используются;",
    "для расчета численности работников включены все лица с одинаковой профессией, независимо от их рабочей нагрузки или типа контракта",
    "для расчета средней заработной платы и распределения заработной платы учитываются работники, занятые полный рабочий день, которые получили доход от работы (то есть доход от работы больше 0);",
    "для расчета средней заработной платы включены лица, чей вид работы в реестре занятости \" Трудовой договор \",\" Государственная служба \" или \" Высший государственный служащий \".",
  ],
  itemsDescription: "Приложение показывает среднюю заработную плату брутто и зарплаты для соответствующей профессии. Средняя заработная плата такова, что половина работников рассматриваемой профессии зарабатывает меньше, а другая половина зарабатывает больше. Например, средняя заработная плата в 1000 евро означает, что половина занятых зарабатывает меньше, а половина зарабатывает более 1000 евро в месяц. Данные о распределении заработной платы не включают заработную плату в нижней и верхней части 2,5%."
},
{
  header: "METOODIKA",
  description:
    "Rakenduses näidatakse Eestis registreeritud töötajate brutopalka valitud perioodil. Kasutatakse töötamise registri (TÖR) ja maksudeklaratsiooni TSD (tulu- ja sotsiaalmaksu, kohustusliku kogumispensioni makse ja töötuskindlustusmakse deklaratsioon) lisade 1 ja 2 andmeid. Registrite väljavõte on tehtud järgmistel tingimustel:",
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
    "Rakenduses näidatakse vastava ametikoha mediaanpalka, s.t palka, millest rohkem ja millest vähem teenivaid töötajaid on sellel ametikohal ühepalju. Näiteks tähendab mediaanpalk 1000 eurot, et pooled sellel ametikohal töötavad inimesed teenivad alla ja pooled üle 1000 euro kuus. Palgajaotuse joonistel ei näidata 2,5% kõige madalamaid ja 2,5% kõige kõrgemaid palkasid.",
}]

export { methodologyEng };
