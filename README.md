# Cypress tester på ReadingListApp

## Beskrivning

Detta är en enkel applikation för att hantera en läsalist av böcker. Användare kan lägga till, uppdatera och ta bort böcker samt välja ett språk från en lista. Applikationen använder React och TypeScript för frontend och en backend byggd med Node.js, som kommunicerar med en PostgreSQL-databas.

## Funktioner

Funktioner som testas med Cypress

1. Formulärverifiering

   Kontrollera att formulärets fält (title, author, language) renderas korrekt med rätt placeholder-text.
   Testa att språklistan (language_id) hämtas korrekt från backend och kan väljas av användaren.

2. Formulärinlämning

   Säkerställ att en ny bok kan läggas till via formuläret:
   Rätt data skickas till backend (kontrolleras med Cypress stub eller mock).
   Ett alertmeddelande visas som bekräftar att boken har lagts till.
   Antalet böcker i frontend uppdateras automatiskt efter inlämning.

3. E2E Tester: Lägg till och verifiera böcker

   Lägg till en ny bok via formuläret:
   Fyll i titel, författare och språk, och skicka formuläret.
   Verifiera datan i backend-databasen:
   Kontrollera att boken finns i databasen med rätt titel, författare och språk.
   Verifiera datan i frontend:
   Kontrollera att boken visas i tabellen med rätt titel och författare.

4. API-integrationer

   GET /api/books:
   Hämta en lista över böcker och verifiera att de renderas korrekt i tabellen.
   GET /api/languages:
   Hämta språkalternativ och kontrollera att rätt språk visas i dropdown-menyn.
   POST /api/books:
   Lägg till en ny bok och verifiera att datan uppdateras korrekt i databasen och frontend.

5. Tabellrendering

   Kontrollera att tabellhuvuden (Book Title, Author, Literature) renderas korrekt.
   Säkerställ att specifika böcker som To Kill a Mockingbird och Moby Dick finns i tabellen (om dessa finns i backend-data).

6. Språkhantering

   Verifiera att ett specifikt språk (t.ex. English) visas korrekt i dropdown och i tabellen.
   Kontrollera att vissa språk (t.ex. Swedish) inte visas i tabellen om de inte finns i datan.

## Installation

1-Kör `npm install` manuellt i både frontend- och backend-mapparna, om det behövs.
2-Starta Docker Desktop.
3-Kör `docker compose up --build -d` i projektets root-mapp.
4-Applikationen är nu tillgänglig på `http://localhost/`.Tester är skrivna med denna URL som bas.
5-Starta Cypress genom att köra `npx cypress open` i terminalen i frontend mapp.
6- Alternativt, kör headless-tester från terminalen:
`npm run test:component --headless`
`npm run test:e2e `

# Gözde Akgün JSU23
