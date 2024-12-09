# Cypress tester på ReadingListApp

## Beskrivning

Detta är en enkel applikation för att hantera en läsalist av böcker. Användare kan lägga till, uppdatera och ta bort böcker samt välja ett språk från en lista. Applikationen använder React och TypeScript för frontend och en backend byggd med Node.js, som kommunicerar med en PostgreSQL-databas.

## Funktioner

Funktioner som testas med Cypress

1. Formulärverifiering

   Kontrollera att formulärets fält (title, author, language) renderas korrekt med rätt placeholder-text.
   Testa att språklistan hämtas korrekt från backend och kan väljas av användaren.

2. Formulärinlämning

   Säkerställ att när en ny bok läggs till via formuläret:
   Rätt data skickas till backend (kontrolleras via Cypress stub).
   Ett alertmeddelande visas som bekräftar att boken har lagts till, tillsammans med uppdaterat antal böcker.

3. API-integrationer

   GET /api/books: Hämta en lista över böcker och verifiera att de renderas korrekt i tabellen.
   GET /api/books: Hämta en lista över böcker och verifiera att rätt författare hämtas korrekt från tabellen.
   GET /api/languages: Hämta språkalternativ och kontrollera att rätt språk visas i dropdown-menyn.
   POST /api/books: Lägg till en ny bok och verifiera att datan uppdateras korrekt.

4. Tabellrendering

   Kontrollera att tabellhuvuden (Book Title, Author, Literature) renderas korrekt.
   Säkerställ att specifika böcker som To Kill a Mockingbird och Moby Dick finns i tabellen.

5. Språkhantering

   Verifiera att ett specifikt språk (English) renderas korrekt.
   Kontrollera att vissa språk (Swedish) inte visas i tabellen om de inte finns i datan.

## Installation

1-Kör `npm install` manuellt i både frontend- och backend-mapparna, om det behövs.
2-Starta Docker Desktop.
3-Kör `docker compose up --build -d` i projektets root-mapp.
4-Applikationen är nu tillgänglig på `http://localhost/`. Tester skrevs enligt denna adressen.
5-Starta Cypress genom att köra `npx cypress open` i terminalen.
6- Eller headless versioner från consolen :
`npm run test:component --headless`
`npm run test:e2e `

# Gözde Akgün JSU23
