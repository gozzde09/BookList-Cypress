import { Book } from "../../src/types/interfaces";
import { Language } from "../../src/types/interfaces";

describe("API: Book List App", () => {
  // Fetch Books
  it("fetches books from the database", () => {
    cy.request("GET", "/api/books").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.greaterThan(0);
    });
  });
  it("renders a specific book and author from the database", () => {
    cy.request("GET", "/api/books").then((response) => {
      const books = response.body;

      const titles = books.map((book: Book) => book.title);
      expect(titles).to.include("To Kill a Mockingbird");

      const authors = books.map((book: Book) => book.author);
      expect(authors).to.include("Orhan Pamuk");
    });
  });

  // Fetch Languages
  it("fetches languages from the database", () => {
    cy.request("GET", "/api/languages").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(10);
    });
  });
  it("renders a specific language from the database", () => {
    cy.request("GET", "/api/languages").then((response) => {
      const lang = response.body;
      const languageNames = lang.map((lang: Language) => lang.name);
      expect(languageNames).to.include("English");
    });
  });

  //POST database
  it("adds a new book to the database and checks if the book count increases at the alert", () => {
    const newBook: Book = {
      title: "New Book to database",
      author: "John Database",
      language_id: 5,
    };
    let initialBookCount = 0;
    cy.request("GET", "/api/books").then((res) => {
      expect(res.body).to.be.an("array");
      initialBookCount = res.body.length;
    });

    cy.request("POST", "/api/books", newBook).then(() => {
      cy.request("GET", "/api/books").then((res) => {
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.length.greaterThan(initialBookCount);
      });
    });
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.contain("Book added successfully!");
      expect(alertText).to.contain(
        `${initialBookCount + 1} book(s) to read now!`
      );
    });
  });

  // GET efter POST
  it("fetches the list of the books correctly from database with new book", () => {
    cy.request("GET", "/api/books").then((res) => {
      expect(res.status).to.eq(200);
      const books = res.body;

      const titles = books.map((book: Book) => book.title);
      expect(titles).to.include("New Book");

      const authors = books.map((book: Book) => book.author);
      expect(authors).to.include("John Doe");
    });
  });
});
