import React, { Component } from "react";

class AboutRus extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="pns-graphs description-page body-stat">
        <p className={"h4-stat"}>Понятия</p>
        <br />
        <div className="text-left body-stat">
          <p className="body-stat-bold" style={{ display: "inline" }}>
            Классификатор профессий
          </p>{" "}
          — для распределения профессий в приложении используется классификатор
          профессий
          (<a href="http://metaweb.stat.ee/classificator_publish_list.htm?siteLanguage=ee">http://metaweb.stat.ee/classificator_publish_list.htm?siteLanguage=ee</a>),
          где профессии делятся на четко определенные группы в зависимости от
          содержания работы, рабочих обязанностей и квалификации, необходимой
          для работы. Эстонская внутригосударственная классификационная состоит
          из пяти уровней, первые четыре из которых соответствуют международной
          базовой классификации ISCO-08 (International Standard Classification
          of Occupations, 2008).
          <br />
          <br />
          Чтобы пояснить иерархию классификации профессий, рассмотрим, например,
          исходя из трудового регистра, профессию садовника. Она относится к
          профессиональной группе «Садовники, работники питомников и садоводы».
          В общем плане он является квалифицированным рабочим в области
          растениеводства и еще в более общем плане — квалифицированным рабочим
          сельского хозяйства. Все квалифицированные рабочие сельского хозяйства
          принадлежат к основной группе профессий «Квалифицированные рабочие в
          сельском, лесном, рыбном и охотничьем хозяйствах».
          <br />
          <br />
          <table className="table-stat w-75 mx-auto">
            <tr>
              <th>Уровень</th>
              <th>Код</th>
              <th>Наименование</th>
            </tr>
            <tr>
              <td>1-й уровень: основная группа</td>
              <td>6</td>
              <td>
                Квалифицированные рабочие в сельском, лесном, рыбном и
                охотничьем хозяйствах
              </td>
            </tr>
            <tr>
              <td>2-й уровень: основная подгруппа</td>
              <td>61</td>
              <td>Квалифицированные рабочие в сельском хозяйстве</td>
            </tr>
            <tr>
              <td>3-й уровень: основная подгруппаp</td>
              <td>611</td>
              <td>Квалифицированные рабочие садоводства</td>
            </tr>
            <tr>
              <td>4-й уровень: группа профессий</td>
              <td>6113</td>
              <td>Садовники, работники питомников и садоводы</td>
            </tr>
            <tr>
              <td>5-й уровень: наименование профессии</td>
              <td>61130001</td>
              <td>Садовник</td>
            </tr>
          </table>
          <br />
          Уровень классификатора, на основе которого в приложении может
          отображаться заработная плата, зависит от размера уезда и количества
          работающих в нем. В крупных уездах заработная плата садовников может
          публиковаться по группе профессий (4-й уровень), но в небольших уездах
          ограничивается 2-м или 3-м уровнем.
          <br />
          <br />
          <p className="body-stat-bold" style={{ display: "inline" }}>
            Коэффициент замещения в момент выхода на пенсию на основе средней
            заработной платы в Эстонии
          </p>{" "}
          — сумма частей первой и второй пенсионных ступеней в месяц,
          рассчитанная на основе предположений, представленных на странице
          прогноза пенсий в год выхода на пенсию, поделенная на среднюю месячную
          брутто-зарплату в Эстонии в том же году. На графике показано
          предполагаемое частотное распределение, основанное на децилях
          коэффициентов замещения.
          <br />
          <br />
          <p className="body-stat-bold" style={{ display: "inline" }}>
            Коэффициент замещения на основе последней заработной платы
          </p>{" "}
          — сумма частей первой и второй пенсионных ступеней в месяц,
          рассчитанная на основе предположений, представленных на странице
          прогноза пенсий в год выхода на пенсию на основании собственной
          брутто-зарплаты до выхода на пенсию. На графике показано
          предполагаемое частотное распределение, основанное на децилях
          коэффициентов замещения.
          <br />
          <br />
          <p className="body-stat-bold" style={{ display: "inline" }}>
            Частота, оцененная на основе децилей
          </p>{" "}
          — неточное распределение частот. Значения децилей в евро являются
          точными, однако частоты получены исходя из децилей. Децили делят
          ранжированные значения заработных плат (или пенсий) на десять равных
          частей, меньше первого дециля только 10% значений самых низких
          заработных плат (пенсий), меньше второго дециля 20% от самых низких
          значений и т.д. Децили даны в процентах на оси «y» слева от медианы,
          т.е. кумулятивно перед пятым децилем, справа от медианы децили
          показаны на оси как сто минус дециль в процентах, или значение
          девятого дециля можно найти на оси «у» около 100 – 90 = 10%.
          <br />
          <br />
          <p className="body-stat-bold" style={{ display: "inline" }}>
            Средняя заработная плата
          </p>{" "}
          — это среднее арифметическое, сумма заработных плат всех работающих на
          полную ставку, поделенная на количество получающих зарплату.
          <br />
          <br />
          <p className="body-stat-bold" style={{ display: "inline" }}>
            Разница между месячной заработной платой мужчин и женщин
          </p>{" "}
          — разница между средней заработной платой мужчин и женщин, поделенная
          на среднюю заработную плату мужчин.
          <br />
          <br />
          <p className="body-stat-bold" style={{ display: "inline" }}>
            Медианная заработная плата
          </p>{" "}
          — это уровень заработной платы, при котором одна половина работающих
          получают больше него, а другая половина — меньше. Например, медианная
          заработная плата в размере 1000 евро означает, что половина работающих
          на этой должности зарабатывает до 1000 евро, а половина — более 1000
          евро в месяц.
          <br />
          <br />
          <p className="body-stat-bold" style={{ display: "inline" }}>
            Прогноз заработной платы на 2030 год
          </p>{" "}
          — в прогнозе использовался рост заработной платы по каждой профессии с
          сентября 2018 года по сентябрь 2019 года. Средневзвешенная заработная
          плата по всем профессиям в 2019 году была скорректирована до
          официальной средней заработной платы в 2019 году, а средневзвешенная
          заработная плата по всем профессиям в 2030 году была скорректирована
          до прогнозируемой Министерством экономики и инфраструктуры средней
          заработной платы в этом году. Ни для одной профессии не допускалось
          отрицательного роста средней заработной платы.
          <br />
          <br />
          <p className="body-stat-bold" style={{ display: "inline" }}>
            Вероятность замены человека компьютером
          </p>{" "}
          — вероятность компьютеризации профессии на основе статьи Фрея и
          Осборна (2017). Наименования профессий SOC, использованные в статье,
          были согласованы с кодами ISCO через SOC Crosswalk (слабые
          соответствия были исключены). Для кодов ISCO вероятность
          рассчитывалась как среднее арифметическое вероятностей кодов SOC.
          Вероятности названы в таблице следующим образом:
          <ul className="ol-stat-bullet">
            <li>низкая, если она составляет менее 0,3;</li>
            <li>
              средняя, если ее значение находится в промежутке от 0,3 до 0,7;
            </li>
            <li>высокая, если она составляет более 0,7.</li>
          </ul>
          Оценка фокусируется на том, сколько работников данной профессии
          технологически смогут заменить компьютеры в неопределенном будущем.
          Точного прогноза, сколько рабочих мест будет фактически
          автоматизировано или как быстро это произойдет, не дается.
          Дополнительная информация о вероятностях: Frey, C. B., & Osborne, M.
          A. (2017). The future of employment: How susceptible are jobs to
          computerisation? Technological forecasting and social change, 114,
          254–280.
          <br />
          <br />
          <p className="body-stat-bold" style={{ display: "inline" }}>
            Необходимость замены в связи с возрастом
          </p>{" "}
          — количество людей данной профессии старше 55 лет, поделенное на общее
          количество работающих на полную ставку. Необходимость замены указана в
          таблице следующим образом:
          <ul className="ol-stat-bullet">
            <li>
              низкая, если удельный вес работающих в возрасте старше 55 лет
              менее 0,2;
            </li>
            <li>
              средняя, если удельный вес работающих в возрасте старше 55 лет
              находится в промежутке от 0,2 до 0,4;
            </li>
            <li>
              высокая, если удельный вес работающих в возрасте старше 55 лет
              выше 0,4.
            </li>
          </ul>
          <br />
          <br />
          <p className={"h4-stat"}>Данные</p>
          <br />
          <br />В приложении отображается брутто-зарплата зарегистрированных в
          Эстонии в выбранный период работающих. Используются данные Регистра
          трудовой деятельности (TÖR) и приложений 1 и 2 налоговой декларации
          TSD (подоходный и социальный налог, взнос в обязательную накопительную
          пенсию и декларация взноса по страхованию от безработицы). Выборка из
          регистра сделана с учетом следующих условий:
          <ol className={"ol-stat"}>
            <li>
              <p className="ml-4">
                при определении медианной заработной платы, распределения
                заработной платы, средней заработной платы и количества
                работающих учитывались все работающие на полную ставку по данной
                профессии или в уезде,
              </p>
              <ul className={"ol-stat"}>
                <li>
                  у которых по состоянию на конец периода имелась действующая
                  запись в трудовом регистре с указанием профессии;
                </li>
                <li>
                  договор с которыми по состоянию на конец периода не был
                  приостановлен;
                </li>
                <li>которые проработали не менее одного месяца;</li>
                <li>
                  в качестве вида занятости которых в TÖR были отмечены
                  «Трудовой договор», «Публичная служба» или «Государственный
                  служащий высшего звена»;
                </li>
                <li>
                  которые получали трудовой доход (т.е. трудовой доход которых
                  был больше нуля);
                </li>
              </ul>
            </li>
            <li>
              <p className="ml-4">
                среднемесячная брутто-зарплата работающего по данной профессии
                рассчитывается за выбранный период на основании
                задекларированных работодателем в приложениях 1 и 2 налоговой
                декларации TSD сумм выплат за выбранный период;
              </p>
            </li>
            <li>
              <p className="ml-4">
                при расчете заработной платы работающего учитывается только
                трудовой доход. Для этого используются выплаты вида 10, 12 и 13
                приложения 1 TSD, а также выплаты вида 120, 121, 126, 127, 144,
                145 приложения 2.
              </p>
            </li>
          </ol>
          Во всех расчетах не принимаются во внимание 2,5% от самых низких и
          самых высоких заработных плат.
          <br />
          <br />
          От таблиц среднемесячного брутто-дохода работающего и получающего
          зарплату (Statistikatöö 50101) используемая в приложении методология
          отличается по типам выплат и определению местонахождения. В этом
          приложении заработная плата указана по местонахождению работы,
          статистика брутто-дохода человека — по месту жительства.
          <br />
          <br />
          <p className={"h4-stat"}>Вопросы и ответы</p>
          <br />
          <br />
          <p className="body-stat-bold" style={{ display: "inline" }}>
            Что показывает приложение по заработной плате?
          </p>{" "}
          В приложении по заработной плате представлена информация о средней и
          медианной заработной плате, а также о разнице в оплате труда мужчин и
          женщин в Эстонии. С помощью приложения можно узнать, как существующий
          гендерный разрыв в оплате труда повлияет на будущие пенсии и какие
          профессии ожидает автоматизация.
          <br />
          <p className="body-stat-bold" style={{ display: "inline" }}>
            На какие данные опирается приложение?
          </p>{" "}
          В приложении отражаются данные о брутто-зарплатах зарегистрированных в
          Эстонии работающих в выбранный промежуток времени. Используются данные
          Регистра трудовой деятельности (TÖR) и приложений 1 и 2 налоговой
          декларации TSD (подоходный и социальный налог, взнос в обязательную
          накопительную пенсию и декларация взноса по страхованию от
          безработицы).
          <br />
          <br />
          <p className="body-stat-bold" style={{ display: "inline" }}>
            Какие работники учитываются?
          </p>{" "}
          Выборка из регистра была сделана по тем работникам, которые по
          состоянию на конец периода имели действующую запись в трудовом
          регистре. Учитываются только записи TÖR с указанием должности
          работника (обязательно с июля 2019 года). Записи, которые были
          приостановлены по состоянию на конец периода, или если время работы
          составляло менее одного месяца, также исключаются.
          <br />
          <br />
          <p className="body-stat-bold" style={{ display: "inline" }}>
            Как рассчитывается средняя брутто-зарплата?
          </p>{" "}
          Среднемесячная брутто-зарплата работающего по данной профессии
          рассчитывается на основании задекларированных работодателем в
          приложениях 1 и 2 налоговой декларации TSD за выбранный период. При
          расчете заработной платы работающего учитывается только трудовой
          доход. Для этого используются выплаты вида 10, 12 и 13 приложения 1
          TSD, а также выплаты вида 120, 121, 126, 127, 144, 145 приложения 2.
          Сумму всех заработных плат делят на количество получающих заработную
          плату.
          <br />
          <br />
          <p className="body-stat-bold" style={{ display: "inline" }}>
            Что такое медианная заработная плата и как она рассчитывается?
          </p>{" "}
          Приложение показывает медианную зарплату для соответствующей
          должности, т.е. сумму, больше и меньше которой зарабатывает одинаковое
          количество работающих на этой должности. Например, медианная
          заработная плата в размере 1000 евро означает, что половина работающих
          на этой должности зарабатывает до 1000 евро, а половина — более 1000
          евро в месяц. Учитываются работающие на полную ставку, получившие
          трудовой доход (т.е. трудовой доход больше нуля). При расчете
          медианной заработной платы учитываются те, в качестве вида занятости
          которых в TÖR были отмечены «Трудовой договор», «Публичная служба» или
          «Государственный служащий высшего звена».
        </div>
        <br></br>
      </div>
    );
  }
}

export default AboutRus;
