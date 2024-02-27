const puppeteer = require('puppeteer');

// Adres URL strony do analizy
const url = 'https://egzamin-informatyk.pl/jedno-pytanie-inf02-ee08-sprzet-systemy-sieci/';




        

// Funkcja do interakcji z przeglądarką i analizy danych
async function scrapeData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Przejście do strony
  await page.goto(url);
  await page.waitForSelector('.tresc');

  // Pobranie zawartości diva o klasie "tresc"
  const tresc = await page.$eval('.tresc', (element) => element.textContent.trim());

  // Sprawdzenie, czy pytanie już istnieje w tabeli
  const jestWtabeli = await czyJestWtabeli(tresc)

  if(jestWtabeli){
    console.log('Pytanie już istnieje w tabeli, pomijam.');
    await browser.close();
    main()
    return;
  }

  // Kliknięcie diva o id "odpa"
  await page.waitForSelector('#odpa');
  await page.evaluate(() => {
    document.getElementById('odpa').click();
  });

  let obrazekURL = 'Brak';
  const obrazekDiv = await page.$('.obrazek');
  if (obrazekDiv) {
    obrazekURL = await obrazekDiv.$eval('img', (img) => img.src);
  }

  // Pobranie zawartości divów od "odpa" do "odpd"
    const odpaTekst = await page.$eval('#odpa', (element) => element.textContent.trim().substring(3));
    const odpbTekst = await page.$eval('#odpb', (element) => element.textContent.trim().substring(3));
    const odpcTekst = await page.$eval('#odpc', (element) => element.textContent.trim().substring(3));
    const odpdTekst = await page.$eval('#odpd', (element) => element.textContent.trim().substring(3));

    await page.waitForSelector('.odpgood');

  // Sprawdzenie, który div ma klasę "odpgood"
  let prawidlowaOdpowiedz;
  if (await page.$eval('#odpa', (element) => element.classList.contains('odpgood'))) {
    prawidlowaOdpowiedz = 'odpA';
  } else if (await page.$eval('#odpb', (element) => element.classList.contains('odpgood'))) {
    prawidlowaOdpowiedz = 'odpB';
  } else if (await page.$eval('#odpc', (element) => element.classList.contains('odpgood'))) {
    prawidlowaOdpowiedz = 'odpC';
  } else if (await page.$eval('#odpd', (element) => element.classList.contains('odpgood'))) {
    prawidlowaOdpowiedz = 'odpD';
  }

  // Tworzenie obiektu z danymi
  const pytanie = {
    pytanie: tresc,
    odpowiedzi: {
      odpA: odpaTekst,
      odpB: odpbTekst,
      odpC: odpcTekst,
      odpD: odpdTekst,
    },
    prawidlowaOdpowiedz: prawidlowaOdpowiedz,
    obrazek: obrazekURL,
  }

  dodawanieDoBazy(pytanie)
  // TODO: Dodanie pytania do tabeli (implementacja zależy od kontekstu aplikacji)

  // Zamknięcie przeglądarki
  await browser.close();
}




async function dodawanieDoBazy(nowe) {
  const url = "https://app-3ltgtwxjda-uc.a.run.app/api/questions/inf02";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nowe),
      };

      const response = await fetch(url, options);
      console.log(response);
}


async function czyJestWtabeli(slowo) {

    // const result = await Pytanie.findOne({ pytanie: slowo });
    // return result !== null;

      const url = "https://app-3ltgtwxjda-uc.a.run.app/api/questions/check/inf02";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pytanie: slowo,
        }),
      };

      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    }





    function main(){
        scrapeData()
    }
    main()