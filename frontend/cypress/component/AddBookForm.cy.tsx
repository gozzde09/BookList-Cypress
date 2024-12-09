import AddBookForm from "../../src/components/AddBookForm";
beforeEach(() => {
  const handleAddBook = cy.stub().as("handleAddBook");
  cy.mount(<AddBookForm onAddBook={handleAddBook} />);
});

describe("AddBookForm", () => {
  //FORM
  it("renders the form", () => {
    cy.get('input[name="title"]')
      .should("exist")
      .and("have.attr", "placeholder", "Book Title");
    cy.get('input[name="author"]')
      .should("exist")
      .and("have.attr", "placeholder", "Author");
    cy.get('select[name="language_id"]').should("exist");
  });
  //LANGUAGES and DROPDOWN MENU
  it("fetches the languages", () => {
    cy.fixture("languages").then((json) => {
      cy.intercept("GET", "/api/languages", json).as("getLanguages");
      expect(json).to.have.length(10);
    });
  });
  it("can select language and verifies it", () => {
    cy.get('select[name="language_id"]')
      .select("English")
      .should("have.value", "1");
    cy.get('select[name="language_id"] option')
      .eq(5)
      .should("have.text", "German");
  });

  //Submit
  it("calls the onAddBook prop with the correct data on form submission", () => {
    cy.get('input[name="title"]').type("Test Book Component");
    cy.get('input[name="author"]').type("Component John");
    cy.get('select[name="language_id"]').select("English");

    cy.get('button[type="submit"]').click();

    cy.get("@handleAddBook").should("have.been.calledOnceWith", {
      title: "Test Book Component",
      author: "Component John",
      language_id: 1,
    });
  });
});
