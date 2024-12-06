describe("My BookList app", function () {
  beforeEach(() => {
    //GET BOOKS
    cy.fixture("books").then((json) => {
      cy.intercept("GET", "/api/books", json).as("getBooks");
    });
    //GET LANGUAGES
    cy.fixture("languages").then((json) => {
      cy.intercept("GET", "/api/languages", json).as("getLanguages");
    });
    //VISIT THE PAGE
    cy.visit("/");
  });

  //BACKEND
  // Fetch Books - Riktig databas
  it("fetches the books from the database", () => {
    cy.request("GET", "/api/books").then((response) => {
      expect(response.status).to.eq(200); // response OK
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.greaterThan(0);
    });
  });
  it("renders a specific book and author", () => {
    cy.request("GET", "/api/books").then((response) => {
      const books = response.body;

      const titles = books.map((book) => book.title);
      expect(titles).to.include("To Kill a Mockingbird");

      const authors = books.map((book) => book.author);
      expect(authors).to.include("Orhan Pamuk");
    });
  });

  // Fetch Languages - Riktig databas
  it("fetches the languages from the database", () => {
    cy.request("GET", "/api/languages").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq(11); // 11 språk
    });
  });
  it("renders a specific language", () => {
    cy.request("GET", "/api/languages").then((response) => {
      const languages = response.body;
      const languageNames = languages.map((language) => language.name);
      expect(languageNames).to.include("English");
    });
  });

  //FRONTEND
  //Table-headers
  it("renders table headers correctly", () => {
    cy.get("th").eq(1).should("contain", "Book Title");
    cy.get("th").eq(2).should("contain", "Author");
    cy.get("th").eq(3).should("contain", "Literature");
  });

  //Fetches
  it("fetches the books", () => {
    cy.wait("@getBooks").then((data) => {
      expect(data.response.body).to.be.an("array");
      expect(data.response.body).to.have.length.greaterThan(0);
    });
  });
  it("fetches the languages", () => {
    cy.wait("@getLanguages").then((data) => {
      expect(data.response.body).to.have.length(10); // Equal 10 at the webbsida
    });
  });

  //Books
  it("render more than two books", () => {
    cy.get("td").should("have.length.greaterThan", 2);
  });
  it("render two specific books", () => {
    cy.get("td").should("contain", "To Kill a Mockingbird");
    cy.get("td").should("contain", "Moby Dick");
  });

  //Languages
  it("render a specific language", () => {
    cy.get("td").should("contain", "English");
  });
  it("does not render a specific language", () => {
    cy.get("td").should("not.contain", "Swedish");
  });
});
