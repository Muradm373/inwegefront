import React, { Component } from "react";

class AboutEng extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="pns-graphs description-page body-stat">
          <p className={"h3-stat"}>Definitions</p>
          <br />
          <div className="text-left body-stat">
          <ul className={"ol-stat"}>
           <li> <p className="body-stat-bold" style={{ display: "inline" }}>
              Classification of Occupations
            </p>{" "}
            – the application uses the Classification of Occupations to classify
            occupations
            <a href="http://metaweb.stat.ee/classificator_publish_list.htm?siteLanguage=ee">(http://metaweb.stat.ee/classificator_publish_list.htm?siteLanguage=ee)</a>.
            Occupations are divided into defined groups based on the content,
            duties and qualifications required by the job. There are five levels
            in the hierarchy of the Estonian classification, the first four of
            which follow the international base classification ISCO-08
            (International Standard Classification of Occupations, 2008).
            <br></br>
            <br></br>
            To explain the hierarchy of the Classification of Occupations, for
            example, let’s consider gardeners according to the employment
            register. Gardeners belong to the occupational group ‘Gardeners,
            Horticultural and Nursery Growers’. Generally, they are considered
            skilled workers in crop production and, more generally, skilled
            agricultural workers. All skilled agricultural workers belong to the
            main group of occupations ‘Skilled Agricultural, Forestry and
            Fishery Workers’.
            <br />
            <br />
            <table className="table-stat mx-auto">
              <tr>
                <th>Level</th>
                <th>Code</th>
                <th>Name</th>
              </tr>
              <tr>
                <td>Level 1: Major Group</td>
                <td>6</td>
                <td>Skilled Agricultural, Forestry and Fishery Workers</td>
              </tr>
              <tr>
                <td>Level 2: Sub-major Group</td>
                <td>61</td>
                <td>Market-oriented Skilled Agricultural Workers</td>
              </tr>
              <tr>
                <td>Level 3: Minor Group</td>
                <td>611</td>
                <td>Market Gardeners and Crop growers</td>
              </tr>
              <tr>
                <td>Level 4: Unit Group</td>
                <td>6113</td>
                <td>Gardeners, Horticultural and Nursery Growers</td>
              </tr>
              <tr>
                <td>Level 5: Occupation</td>
                <td>61130001</td>
                <td>Gardener</td>
              </tr>
            </table>
            <br />
            The level of the classification at which the wage can be shown in
            the application depends on the size of the county and the number of
            employees there. In larger counties, the wage of gardeners can be
            expressed at the unit group level (Level 4), but in smaller
            counties, it is limited to Level 2 or 3.
            </li>
            <br />
            <li>
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Replacement rate in relation to average wage in Estonia at the
              time of retirement
            </p>{" "}
            – the sum of the I and II pension pillars per month calculated on
            the basis of the assumptions presented on the pension projection
            page in the year of retirement, divided by the average gross monthly
            wages in Estonia in the same year. The figure shows the estimated
            frequency distribution based on the deciles of the replacement
            rates.
            </li>
            <br />
            <li>
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Replacement rate based on the employee’s last wage
            </p>{" "}
            – the sum of the I and II pension pillar components calculated on
            the basis of the assumptions presented on the pension projection
            page in the year of retirement on the basis of the person’s own
            gross wage before retirement. The figure shows the estimated
            frequency distribution based on the deciles of the replacement
            rates.
            </li>
            <br />
            <li>
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Decile-based estimation of frequency
            </p>{" "}
            – it is not an exact frequency distribution. The values of deciles
            in euros are accurate, but the frequencies are derived from deciles.
            The deciles divide the values of wages (or pensions) into ten equal
            parts. 10% of the values of the lowest wages (pensions) are smaller
            than the first decile, 20% of the lowest values are lower than the
            second decile, etc. Deciles are expressed as percentages on the
            y-axis on the left of the median, i.e. cumulatively before the fifth
            decile. On the right of the median, deciles are shown on the axis as
            one hundred minus decile in per cent, i.e. the value of the ninth
            decile is found on the y-axis at 100 – 90 = 10%.
            </li>
            <br />
            <li>
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Average wage
            </p>{" "}
            – arithmetic mean, the sum of the wages of all full-time employees
            divided by the number of wage earners.
            </li>
            <br />
            <li>
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Difference in males’ and females’ monthly wages
            </p>{" "}
            – difference between the average wages of males and females divided
            by the average wages of males.
            </li>
            <br />
            <li>
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Median wage
            </p>{" "}
            – a payment from which a half the employees in this occupation earn
            more and half earn less. For example, a median wage of 1,000 euros
            means that half of the employees in this position earn up to 1,000
            euros and half of the employees earn more than 1,000 euros per
            month.
            </li>
            <br />
            <li>
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Wage projection for 2030
            </p>{" "}
            – for each occupation, wage increase from September 2018 to
            September 2019 has been used in the projection. The weighted average
            wages of all occupations in 2019 have been aligned with the official
            average wages in 2019 and the weighted average wages of all
            occupations under consideration in 2030 have been aligned with the
            average wage projected by the Ministry of Economic Affairs and
            Communications in this year. No occupation was allowed a negative
            increase in the average wage.
            </li>
            <br />
            <li>
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Risk that a person will be replaced by a computer
            </p>{" "}
            – the probability of computerisation of the profession based on an
            article by Frey and Osborne (2017). The SOC occupations used in the
            article have been aligned with the ISCO codes through the SOC
            Crosswalk (weak matches were left out). For ISCO codes, probability
            was calculated as the arithmetic mean of the probabilities of SOC
            codes. The probabilities are listed in the table as follows:
            <ul className="ol-stat-bullet">
              <li>low if it is below 0.3;</li>
              <li>medium if it is between 0.3 and 0.7;</li>
              <li>high if it is more than 0.7.</li>
            </ul>
            The assessment focuses on how many employees in the profession might
            be replaced by computers in the indefinite future. It is not
            predicted exactly how many jobs will actually be automated or how
            quickly this will happen. More info about probabilities: Frey, C.
            B., & Osborne, M. A. (2017). The future of employment: How
            susceptible are jobs to computerisation? Technological forecasting
            and social change, 114, 254–280.
            </li>
            <br />
             <li>
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Age-related replacement need
            </p>{" "}
            – the number of people aged 55 or older in the occupation, divided
            by the total number of full-time employees. The replacement need is
            indicated in the table as follows:
            <ul className="ol-stat-bullet">
              <li>
                low if the proportion of persons aged 55 and older is below 0.2;
              </li>
              <li>
                medium if the proportion of persons aged 55 and older is between
                0.2 and 0.4;
              </li>
              <li>
                high if the proportion of persons aged 55 and older is more than
                0.4.
              </li>
            </ul>
            </li>
            </ul>
            <br />
            <p className={"h3-stat"}>Data</p>
            <br />
            The application shows the gross wages and salaries of employees
            registered in Estonia for the selected period. The data of the
            employment register and Annexes 1 and 2 of the tax return TSD
            (income and social tax, mandatory funded pension tax and
            unemployment insurance tax return) are used. An extract from the
            register has been made under the following conditions:
            <ol className={"ol-stat counter-reset"}>
              <li>
                <p className=" body-stat">
                  data on the median wage, wage distributions, average wage and
                  number of employees cover the full-time employees in the
                  position or county
                </p>
                <ul className={"ol-stat-bullet"}>
                  <li>
                    who at the end of the employment record period had a valid
                    entry including their job title in the employment register;
                  </li>
                  <li>
                    whose contract had not been suspended as at the end of the
                    period;
                  </li>
                  <li>whose period of employment was at least one month;</li>
                  <li>
                    whose type of employment was marked ‘Employment Contract’,
                    ‘Civil Service’ or ‘Senior Civil Servant’ in the employment
                    register;
                  </li>
                  <li>
                    who had received income from work (i.e. employment income
                    was bigger than zero);
                  </li>
                </ul>
              </li>
              <li>
                <p className=" body-stat">
                  the average gross monthly wage of the employee in the position
                  is calculated on the basis of the payment amounts of Annexes 1
                  and 2 of the tax return TSD declared by the employer during
                  the selected period;
                </p>
              </li>
              <li>
                <p className=" body-stat">
                  only income from work is taken into account when calculating
                  the wages of employees. For this purpose, Annex 1 types of
                  payment 10, 12 and 13 and Annex 2 types of payment 120, 121,
                  126, 127, 144, 145 are used.
                </p>
              </li>
            </ol>
            2.5% of the lowest and highest wages are excluded from all
            calculations.
            <br />
            The methodology used in the application differs from the tables of
            the average monthly gross income per employee (Statistical activity
            50101) in terms of payment types and location. In this application,
            wages are shown by the location of the workplace, whereas in the
            gross income statistics they are shown by the person’s place of
            residence.
            <br />
            <br />
            <p className={"h3-stat"}>Q&A</p>
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              What does the wages and salaries application show?
            </p>{" "}
            <br />
            The wages and salaries application provides information on the
            average and median wages and wage differences between men and women
            in Estonia. It is also possible to examine how the current gender
            pay gap affects future pensions and what occupations can be expected
            to be automated.
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              What data are used in the application?
            </p>{" "}
            <br />
            The application shows the gross wages of employees registered in
            Estonia during the selected period. The data of the employment
            register and Annexes 1 and 2 of the tax return TSD (income and
            social tax, mandatory funded pension tax and unemployment insurance
            tax return) are used.
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Which employees have been taken into account?
            </p>{" "}
            <br />
            An extract from the register has been taken for those employees who
            had a valid employment record in the employment register as at the
            end of the period. Only those employment register records that
            indicate the employee’s job title (mandatory from July 2019) are
            taken into account. Entries that have been suspended as at the end
            of the period or where the period of employment is less than one
            month are also excluded.
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              How are average gross wages calculated?
            </p>{" "}
            <br />
            The average gross monthly wage for the employee’s position is
            calculated on the basis of the payment amounts of Annexes 1 and 2 of
            the tax return TSD declared by the employer for the selected period.
            Only income from work is taken into account when calculating the
            wages of employees. For this purpose, Annex 1 types of payment 10,
            12 and 13 and Annex 2 types of payment 120, 121, 126, 127, 144, 145
            are used. The sum of all wages is divided by the number of wage
            earners.
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              What is the median wage and how is it calculated?
            </p>{" "}
            <br />
            half of the employees in this position earn up to 1,000 euros and
            half of the employees earn more than 1,000 euros per month.
            Full-time employees who have received income from work are taken
            into account (i.e. employment income is greater than zero). In
            determining the median wage, these persons are taken into account
            whose type of employment was marked ‘Employment Contract’, ‘Civil
            Service’ or ‘Senior Civil Servant’ in the employment register.
          </div>
          <br></br>
        </div>
      </div>
    );
  }
}

export default AboutEng;
