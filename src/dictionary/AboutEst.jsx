import React, { Component } from "react";

class AboutEst extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="pns-graphs description-page body-stat">
          <p className={"h4-stat"}>Definitsioonid</p>
          <br />
          <div className="text-left body-stat">
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Ametite klassifikaator
            </p>{" "}
            – rakenduses kasutatakse ametite liigitamiseks ametite
            klassifikaatorit
            <a href="http://metaweb.stat.ee/classificator_publish_list.htm?siteLanguage=ee">(http://metaweb.stat.ee/classificator_publish_list.htm?siteLanguage=ee</a>),
            kus ametid on jagatud täpselt määratletud rühmadesse töö sisu,
            tööülesannete ja kvalifikatsiooni alusel, mida töö eeldab. Eesti
            riigisisese klassifikaatori hierarhias on viis taset, millest
            esimesed neli järgivad rahvusvahelist alusklassifikaatorit ISCO-08
            (International Standard Classification of Occupations, 2008).
            Ametite klassifikaatori hierarhia selgitamiseks vaatame näiteks on
            töötamise registri järgi aednikku. Ta kuulub ametirühma „Aednikud,
            puukooli töötajad ja istikukasvatajad“. Üldisemalt on ta
            taimekasvatuse oskustööline ja veelgi üldisemalt põllumajanduse
            oskustööline. Kõik põllumajanduse oskustöölised kuuluvad ametite
            pearühma „Põllumajanduse, metsanduse, kalanduse ja jahinduse
            oskustöölised“.
            <br />
            <br />
            <table className="table-stat mx-auto">
              <tr>
                <th>Tase</th>
                <th>Kood</th>
                <th>Nimetus</th>
              </tr>
              <tr>
                <td>1. tase: pearühm</td>
                <td>6</td>
                <td>
                  Põllumajanduse, metsanduse, kalanduse ja jahinduse
                  oskustöölised
                </td>
              </tr>
              <tr>
                <td>2. tase: allpearühm</td>
                <td>61</td>
                <td>Põllumajanduse oskustöölised</td>
              </tr>
              <tr>
                <td>3. tase: allrühm</td>
                <td>611</td>
                <td>Taimekasvatuse oskustöölised</td>
              </tr>
              <tr>
                <td>4. tase: ametirühm</td>
                <td>6113</td>
                <td>Aednikud, puukooli töötajad ja istikukasvatajad</td>
              </tr>
              <tr>
                <td>5. tase: ametinimetus</td>
                <td>61130001</td>
                <td>Aednik</td>
              </tr>
            </table>
            <br />
            Klassifikaatori tase, mille alusel saab rakenduses palka näidata,
            oleneb maakonna suurusest ja sealsete töötajate arvust. Suuremates
            maakondades saab aednike palga avaldada ametirühma järgi (4.
            tasemel), väiksemates aga peab piirduma 2. või 3. tasemega.
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Asendusmäär Eesti keskmise palga alusel pensionile minemise hetkel
            </p>{" "}
            – pensionile minemise aastal pensioniprognoosi lehel esitatud
            eelduste põhjal arvutatud esimese ja teise pensionisamba osade summa
            kuus, mis on jagatud Eesti keskmise brutopalgaga kuus samal aastal.
            Joonisel on kujutatud hinnanguline sagedusjaotus asendusmäärade
            detsiilide põhjal.
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Asendusmäär töötaja viimase palga alusel
            </p>{" "}
            – pensioniprognoosi lehel esitatud eelduste põhjal arvutatud esimese
            ja teise pensionisamba pensioniosade summa pensionile minemise
            aastal inimese enda brutopalga alusel enne pensionile minemist.
            Joonisel on kujutatud hinnanguline sagedusjaotus asendusmäärade
            detsiilide põhjal.
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Detsiilide põhjal hinnatud sagedusjaotus
            </p>{" "}
            – ei ole täpne sagedusjaotus. Detsiilide väärtused eurodes on
            täpsed, kuid sagedused tuletatud detsiilide põhjal. Detsiilid
            jagavad palkade (või pensionide) väärtuste järjestatud rea kümneks
            võrdseks osaks, esimesest detsiilist väiksemad on ainult 10% kõige
            madalamate palkade (pensionide) väärtustest, teisest detsiilist
            väiksemad on 20% kõige madalamatest väärtustest jne. Detsiilid on
            esitatud protsentides y-teljel vasakul pool mediaani ehk enne
            viiendat detsiili toodud kumulatiivsena, paremal pool mediaani on
            detsiilid näidatud teljel kui sada miinus detsiil protsentides, ehk
            üheksanda detsiili väärtuse leiab y-teljel 100 – 90 = 10% juurest.
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Keskmine palk
            </p>{" "}
            – aritmeetiline keskmine, kõigi täisajaga töötavate inimeste palkade
            summa, mis on jagatud palgasaajate arvuga.
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Meeste ja naiste kuupalga erinevus
            </p>{" "}
            – meeste ja naiste keskmise palga vahe, mis on jagatud meeste
            keskmise palgaga.
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Mediaanpalk
            </p>{" "}
            – väljamakse, millest sellel ametikohal rohkem ja vähem teenivaid
            töötajaid on ühepalju. Näiteks tähendab mediaanpalk 1000 eurot, et
            pool sellel ametikohal töötajatest teenib kuni 1000 ja pool üle 1000
            euro kuus.
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Palgaprognoos 2030. aastaks
            </p>{" "}
            – prognoosimisel on kasutatud iga ametiala palgakasvu aastail 2018
            ja 2019 / 2019. aastal. Kõigi ametialade kaalutud keskmine palk
            kokku 2019. aastal on viidud vastavusse ametliku keskmise palgaga
            2019. aastal ja kõigi vaatluse all olevate ametialade 2030. aasta
            kaalutud keskmine palk kokku on viidud vastavusse majandus- ja
            kommunikatsiooniministeeriumi prognoositava keskmise palgaga sel
            aastal. Ühelgi ametialal ei lubatud keskmise palga negatiivset
            kasvu.
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Tõenäosus, et inimese asendab arvuti
            </p>{" "}
            – ametiala arvutiseerimise tõenäosus Frey ja Osborne’i (2017)
            artikli alusel. Artiklis kasutatud SOC-ametialad on vastavusse
            viidud ISCO-koodidega SOC Crosswalk’i abil (nõrgad vastavused jäeti
            välja). ISCO-koodide jaoks arvutati tõenäosus SOC-koodide
            tõenenäosuste aritmeetiliste keskmisena. Tõenäosust on nimetatud
            tabelis järgmiselt:
            <ul className="ol-stat-bullet">
              <li>väike, kui see on madalam kui 0,3;</li>
              <li>keskmine, kui see jääb vahemikku 0,3 kuni 0,7;</li>
              <li>suur, kui see on kõrgem kui 0,7.</li>
            </ul>
            Hinnang keskendub sellele, kui palju vastava ametiala töötajatest
            suudavad arvutid määramata ajal tulevikus tehnoloogiliselt asendada.
            Ei ennustata täpselt, kui palju töökohti tegelikult
            automatiseeritakse või kui kiiresti see juhtub. Lisainfo tõenäosuste
            kohta: Frey, C. B., & Osborne, M. A. (2017). The future of
            employment: How susceptible are jobs to computerisation?
            Technological forecasting and social change, 114, 254–280.
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Asendusvajadus vanuse tõttu
            </p>{" "}
            – ametiala üle 55-aastaste inimeste arv, mis on jagatud kõigi
            täisajaga töötavate inimeste arvuga. Asendusvajadus on tabelisse
            märgitud järgmiselt:
            <ul className="ol-stat-bullet">
              <li>väike, kui üle 55-aastaste osatähtsus on väiksem kui 0,2;</li>
              <li>
                keskmine, kui üle 55-aastaste inimeste osatähtsus jääb vahemikku
                0,2 kuni 0,4;
              </li>
              <li>
                suur, kui üle 55-aastaste inimeste osatähtsus on suurem kui 0,4.
              </li>
            </ul>
            <br />
            <br />
            <p className={"h4-stat"}>Andmed</p>
            <br />
            <br />
            Rakenduses näidatakse Eestis registreeritud töötajate brutopalk
            valitud ajavahemikus. Kasutatakse töötamise registri (TÖR) ja
            maksudeklaratsiooni TSD (tulu- ja sotsiaalmaksu, kohustusliku
            kogumispensioni makse ja töötuskindlustusmakse deklaratsioon) lisade
            1 ja 2 andmeid. Registriväljavõte on tehtud järgmiste tingimuste
            korral:
            <ol className={"ol-stat"}>
              <li>
                <p className="ml-4 body-stat">
                  mediaanpalga, palgajaotuste, keskmise palga ja töötajate arvu
                  leidmisel on võetud arvesse kõik sellel ametikohal või
                  maakonnas täiskohaga töötajad
                </p>
                <ul className={"ol-stat"}>
                  <li>
                    kellel oli töötamise registris koos ametinimetusega kehtiv
                    töötamise kirje perioodi lõpu seisuga;
                  </li>
                  <li>kelle leping ei olnud perioodi lõpu seisuga peatatud;</li>
                  <li>kelle töötamise aeg oli vähemalt üks kuu;</li>
                  <li>
                    kelle töötamise liigiks oli TÖR-is märgitud „Tööleping“,
                    „Avalik teenistus“ või „Kõrgem riigiteenija“;
                  </li>
                  <li>
                    kes olid saanud töist tulu (s.t töine tulu on suurem kui
                    null);
                  </li>
                </ul>
              </li>
              <li>
                <p className="ml-4 body-stat">
                  töötaja keskmine kuu brutopalk ametikohal arvutatakse välja
                  valitud perioodi jooksul tööandja deklareeritud
                  maksudeklaratsiooni TSD lisade 1 ja 2 väljamakse summade
                  põhjal;
                </p>
              </li>
              <li>
                <p className="ml-4 body-stat">
                  töötajate palga arvutamisel võetakse arvesse vaid töine tulu.
                  Selleks kasutatakse TSD lisa 1 väljamakseliike 10, 12 ja 13
                  ning lisa 2 väljamakseliike 120, 121, 126, 127, 144, 145.
                </p>
              </li>
            </ol>
            Kõigist arvutustest on välja jäetud 2,5% kõige madalamatest ja kõige
            kõrgematest palkadest.
            <br />
            <br />
            Palgatöötaja kuu keskmise brutotulu tabelitest (Statistikatöö 50101)
            erineb rakenduses kasutatud metoodika väljamakse liikide ja asukoha
            määratluse poolest. Selles rakenduses näidatakse palku töökoha
            asukoha järgi, brutotulu statistikas isiku kohta tema elukoha järgi.
            <br />
            <br />
            <p className={"h4-stat"}>Küsimused ja vastused</p>
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Mida näitab palgarakendus?
            </p>{" "}
            Palgarakendus annab teavet keskmise ja mediaanpalga ning meeste ja
            naiste palgaerinevuste kohta Eestis. Ühtlasi saab uurida, kuidas
            praegune sooline palgaerinevus mõjutab tulevast pensioni ja mis
            ameteid võib oodata automatiseerimine.
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Mis andmetele rakendus tugineb?
            </p>{" "}
            Rakenduses näidatakse Eestis registreeritud töötajate brutopalka
            valitud ajal. Kasutatakse töötamise registri (TÖR) ja
            maksudeklaratsiooni TSD (tulu- ja sotsiaalmaksu, kohustusliku
            kogumispensioni makse ja töötuskindlustusmakse deklaratsioon) lisade
            1 ja 2 andmeid.
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Millised töötajad on arvesse võetud?
            </p>{" "}
            Registriväljavõte on tehtud nende töötajate kohta, kellel oli
            töötamise registris kehtiv töötamise kirje perioodi lõpu seisuga.
            Arvesse võetakse vaid need TÖR-i kirjed, kus on märgitud töötaja
            ametinimetus (kohustuslik alates juulist 2019). Ühtlasi on välja
            jäetud kirjed, mis on perioodi lõpu seisuga peatatud või kus
            töötamise aeg on alla ühe kuu.
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Kuidas arvutatakse keskmist brutopalka?
            </p>{" "}
            Töötaja ametikoha keskmine brutopalk kuus arvutatakse valitud
            perioodi jooksul tööandja deklareeritud maksudeklaratsiooni TSD
            lisade 1 ja 2 väljamaksesummade põhjal. Töötajate palga arvutamisel
            võetakse arvesse vaid töine tulu. Selleks kasutatakse TSD lisa 1
            väljamakseliike 10, 12 ja 13 ning lisa 2 väljamakseliike 120, 121,
            126, 127, 144, 145. Kõigi palkade summa jagatakse palgasaajate
            arvuga.
            <br />
            <br />
            <p className="body-stat-bold" style={{ display: "inline" }}>
              Mis on mediaanpalk ja kuidas seda arvutatakse?
            </p>{" "}
            Rakenduses näidatakse ametikoha mediaanpalka, s.t väljamakset,
            millest rohkem ja millest vähem teenivaid töötajaid on sellel
            ametikohal ühepalju. Näiteks tähendab mediaanpalk 1000 eurot, et
            pool sellel ametikohal töötajatest teenib kuni 1000 ja pool üle 1000
            euro kuus. Arvesse võetakse täiskohaga töötajad, kes on saanud töist
            tulu (s.t töine tulu on suurem kui null). Mediaanpalga leidmisel
            võetakse arvesse inimesed, kelle töötamise liigiks on TÖR-is
            märgitud „Tööleping“, „Avalik teenistus“ või „Kõrgem riigiteenija“.
          </div>
          <br></br>
        </div>
      </div>
    );
  }
}

export default AboutEst;
