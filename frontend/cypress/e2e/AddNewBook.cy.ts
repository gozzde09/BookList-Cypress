import { Book } from "../../src/types/interfaces";

describe("E2E: Add a new book and verify it in the database and frontend", () => {
  const newBook: Book = {
    title: "Add New Book E2E",
    author: "E2E Author",
    language_id: 6,
  };

  beforeEach(() => {
    cy.visit("/");
  });
  //Tillägga bok med form
  it("adds a new book through the form", () => {
    cy.get('input[name="title"]').type(newBook.title);
    cy.get('input[name="author"]').type(newBook.author);
    cy.get('select[name="language_id"]').select("Italian");
    cy.get('button[type="submit"]').click();
  });

  // Boken i database
  it("verifies the book is added to the backend database", () => {
    cy.request("GET", "/api/books").then((response) => {
      expect(response.status).to.eq(200);
      const books = response.body;
      const addedBook = books.find(
        (book: Book) => book.title === newBook.title
      );
      expect(addedBook.author).to.eq(newBook.author);
      expect(addedBook.language_id).to.eq(newBook.language_id);
    });
  });

  //Boken i frontend
  it("verifies the book appears in the frontend table", () => {
    cy.get("td").should("contain", newBook.title);
    cy.get("td").should("contain", newBook.author);
  });
});
