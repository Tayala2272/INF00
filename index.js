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
  if (czyJestWtabeli(tresc)) {
    console.log('Pytanie już istnieje w tabeli, pomijam.');
    await browser.close();
    return;
  }

  // Kliknięcie diva o id "odpa"
  await page.waitForSelector('#odpa');
  await page.evaluate(() => {
    document.getElementById('odpa').click();
  });

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
    'prawidlowa-odpowiedz': prawidlowaOdpowiedz,
  };

  tabela.push(pytanie)
  // TODO: Dodanie pytania do tabeli (implementacja zależy od kontekstu aplikacji)

  // Zamknięcie przeglądarki
  await browser.close();
}

  const tabela = {};
// Funkcja sprawdzająca, czy pytanie już istnieje w tabeli
function czyJestWtabeli(tresc) {
  // TODO: Implementacja sprawdzania w tabeli (zależy od kontekstu aplikacji)
  // Możesz użyć bazy danych, listy w pamięci, itp.
  // Przykład zakłada użycie tablicy tymczasowej
  return tabela.includes(tresc);
}

// Wywołanie funkcji głównej
for (let index = 0; index < 3; index++) {
    
    scrapeData();
}
console.log(tabela)