describe("Тесты страницы разворота строки", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/recursion");
  });

  describe("Проверка состояния кнопки", function () {
    it("Кнопка верно меняет значение атрибута disabled", function () {
      cy.contains("Развернуть").as("button");
      cy.get("@button").should("be.disabled");
      cy.get("input").type("test");
      cy.get("@button").should("not.be.disabled");
      cy.get("input").clear();
      cy.get("@button").should("be.disabled");
    });
  });

  describe("Проверка работы анимации алгоритма", function () {
    it("Корректно разворачивает строку", function () {
      cy.get("input").type("hello");
      cy.contains("Развернуть").click();
      cy.get("[class*=circle_circle]")
        .should("have.length", 5)
        .each(($el, index) => {
          if (index === 0) expect($el).to.contain("h");
          if (index === 1) expect($el).to.contain("e");
          if (index === 2) expect($el).to.contain("l");
          if (index === 3) expect($el).to.contain("l");
          if (index === 4) expect($el).to.contain("o");

          if (index === 0 || index === 4) {
            cy.wrap($el).should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
            if (index === 0) expect($el).to.contain("h");
            if (index === 4) expect($el).to.contain("o");
          }
        });

      cy.wait(500);

      cy.get("[class*=circle_circle]").each(($el, index) => {
        if (index === 0 || index === 4) {
          cy.wrap($el).should(
            "have.css",
            "border",
            "4px solid rgb(127, 224, 81)"
          );
          if (index === 0) expect($el).to.contain("o");
          if (index === 4) expect($el).to.contain("h");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_circle]").each(($el, index) => {
        if (index === 1 || index === 3) {
          cy.wrap($el).should(
            "have.css",
            "border",
            "4px solid rgb(210, 82, 225)"
          );
          if (index === 1) expect($el).to.contain("e");
          if (index === 3) expect($el).to.contain("l");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_circle]").each(($el, index) => {
        if (index === 1 || index === 3) {
          cy.wrap($el).should(
            "have.css",
            "border",
            "4px solid rgb(127, 224, 81)"
          );
          if (index === 1) expect($el).to.contain("l");
          if (index === 3) expect($el).to.contain("e");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_circle]").each(($el, index) => {
        if (index === 2) {
          cy.wrap($el).should(
            "have.css",
            "border",
            "4px solid rgb(210, 82, 225)"
          );
          expect($el).to.contain("l");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_circle]").each(($el, index) => {
        if (index === 2) {
          cy.wrap($el).should(
            "have.css",
            "border",
            "4px solid rgb(127, 224, 81)"
          );
          expect($el).to.contain("l");
        }
      });
    });
  });
});
