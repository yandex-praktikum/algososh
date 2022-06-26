describe("Тесты страницы стека", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/stack");
  });

  describe("Проверка состояния кнопки", function () {
    it("Кнопка верно меняет значение атрибута disabled", function () {
      cy.contains("Добавить").as("button");
      cy.get("@button").should("be.disabled");
      cy.get("input").type("123");
      cy.get("@button").should("not.be.disabled");
      cy.get("input").clear();
      cy.get("@button").should("be.disabled");
    });
  });

  describe("Проверка работы анимации изменения структуры данных", function () {
    it("Корректно добавляет несколько элементов", function () {
      // Добавляем и смотрим за первым элементом
      cy.get("input").type("new1");
      cy.contains("Добавить").click();
      cy.get("[class*=circle_content]")
        .should("have.length", 1)
        .each(($el) => {
          expect($el).to.contain("new1");
          expect($el).to.contain("0");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        });

      cy.wait(500);

      cy.get("[class*=circle_content]")
        .should("have.length", 1)
        .each(($el) => {
          expect($el).to.contain("new1");
          expect($el).to.contain("top");
          expect($el).to.contain("0");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        });

      cy.wait(500);

      // Добавляем и смотрим за вторым элементом
      cy.get("input").type("new2");
      cy.contains("Добавить").click();
      cy.get("[class*=circle_content]")
        .should("have.length", 2)
        .each(($el, index) => {
          if (index === 0) {
            expect($el).to.contain("new1");
            expect($el).to.contain("0");
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(0, 50, 255)");
          } else {
            expect($el).to.contain("new2");
            expect($el).to.contain("1");
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(0, 50, 255)");
          }
        });

      cy.wait(500);

      cy.get("[class*=circle_content]")
        .should("have.length", 2)
        .each(($el, index) => {
          if (index === 0) {
            expect($el).to.contain("new1");
            expect($el).to.contain("0");
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(0, 50, 255)");
          } else {
            expect($el).to.contain("top");
            expect($el).to.contain("new2");
            expect($el).to.contain("1");
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(210, 82, 225)");
          }
        });
    });

    it("Корректно удаляет несколько элементов", function () {
      // Добавляем 2 элемента
      cy.get("input").type("new1");
      cy.contains("Добавить").click();
      cy.get("input").type("new2");
      cy.contains("Добавить").click();

      cy.wait(500);

      cy.get("[class*=circle_content]")
        .should("have.length", 2)
        .each(($el, index) => {
          if (index === 0) {
            expect($el).to.contain("new1");
            expect($el).to.contain("0");
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(0, 50, 255)");
          } else {
            expect($el).to.contain("top");
            expect($el).to.contain("new2");
            expect($el).to.contain("1");
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(210, 82, 225)");
          }
        });

      // Удаляем первый
      cy.contains("Удалить").click();
      cy.get("[class*=circle_content]")
        .should("have.length", 1)
        .each(($el) => {
          expect($el).to.contain("new1");
          expect($el).to.contain("0");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        });

      cy.wait(500);

      cy.get("[class*=circle_content]")
        .should("have.length", 1)
        .each(($el) => {
          expect($el).to.contain("new1");
          expect($el).to.contain("top");
          expect($el).to.contain("0");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        });

      cy.wait(500);

      // Удаляем второй
      cy.contains("Удалить").click();
      cy.get("[class*=circle_content]").should("have.length", 0);
    });

    it("Корректно работает кнопка 'очистить'", function () {
      // Добавляем 2 элемента
      cy.get("input").type("new1");
      cy.contains("Добавить").click();
      cy.get("input").type("new2");
      cy.contains("Добавить").click();

      cy.wait(500);

      cy.get("[class*=circle_content]")
        .should("have.length", 2)
        .each(($el, index) => {
          if (index === 0) {
            expect($el).to.contain("new1");
            expect($el).to.contain("0");
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(0, 50, 255)");
          } else {
            expect($el).to.contain("top");
            expect($el).to.contain("new2");
            expect($el).to.contain("1");
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(210, 82, 225)");
          }
        });

      cy.contains("Очистить").click();
      cy.get("[class*=circle_content]").should("have.length", 0);
    });
  });
});
