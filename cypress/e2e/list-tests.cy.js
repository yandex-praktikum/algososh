describe("Тесты страницы связного списка", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/list");
  });

  describe("Проверка состояний кнопок", function () {
    it("Кнопки добавления/удаления верно меняют значение атрибута disabled", function () {
      cy.contains("Добавить в head").should("be.disabled");
      cy.contains("Добавить в tail").should("be.disabled");
      cy.contains("Удалить из head").should("not.be.disabled");
      cy.contains("Удалить из tail").should("not.be.disabled");
      cy.get('input[name="value"]').type("123");
      cy.contains("Добавить в head").should("not.be.disabled");
      cy.contains("Добавить в tail").should("not.be.disabled");
      cy.contains("Удалить из head").should("not.be.disabled");
      cy.contains("Удалить из tail").should("not.be.disabled");
      cy.get('input[name="value"]').clear();
      cy.contains("Добавить в head").should("be.disabled");
      cy.contains("Добавить в tail").should("be.disabled");
      cy.contains("Удалить из head").should("not.be.disabled");
      cy.contains("Удалить из tail").should("not.be.disabled");
    });

    it("Кнопки добавления/удаления по индексу верно меняют значение атрибута disabled", function () {
      cy.contains("Добавить по индексу").should("be.disabled");
      cy.contains("Удалить по индексу").should("be.disabled");
      cy.get('input[name="value"]').type("123");
      cy.get('input[name="index"]').type("3");
      cy.contains("Добавить по индексу").should("not.be.disabled");
      cy.contains("Удалить по индексу").should("not.be.disabled");
      cy.get('input[name="value"]').clear();
      cy.get('input[name="index"]').clear();
      cy.contains("Добавить по индексу").should("be.disabled");
      cy.contains("Удалить по индексу").should("be.disabled");
    });
  });

  describe("Проверка работы анимации изменения структуры данных", function () {
    it("При открытии страницы виден дефолтный список", function () {
      cy.get("[class*=circle_content]")
        .should("have.length", 6)
        .each(($el, index) => {
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
          if (index === 0) {
            expect($el).to.contain("head");
          }
          if (index === 5) {
            expect($el).to.contain("tail");
          }
        });
    });
    it("Корректно добавляется элемент в head", function () {
      cy.get('input[name="value"]').type("123");
      cy.contains("Добавить в head").click();

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .siblings()
            .find("[class*=circle_small]")
            .should("have.css", "border", "4px solid rgb(210, 82, 225)")
            .should("have.text", "123");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(127, 224, 81)")
            .should("have.text", "123");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)")
            .should("have.text", "123");
        }
      });
    });
  });

  /*  describe("Проверка работы анимации изменения структуры данных", function () {
    it("Корректно добавляет несколько элементов", function () {
      // Добавляем и смотрим за первым элементом
      cy.get("input").type("new1");
      cy.contains("Добавить").click();
      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("new1");
          expect($el).to.contain("0");
          expect($el).to.contain("head");
          expect($el).to.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

      cy.wait(500);

      // Добавляем и смотрим за вторым элементом
      cy.get("input").type("new2");
      cy.contains("Добавить").click();
      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("new1");
          expect($el).to.contain("0");
          expect($el).to.contain("head");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 1) {
          expect($el).to.contain("new2");
          expect($el).to.contain("1");
          expect($el).to.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("new1");
          expect($el).to.contain("0");
          expect($el).to.contain("head");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 1) {
          expect($el).to.contain("new2");
          expect($el).to.contain("1");
          expect($el).to.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
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

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("new1");
          expect($el).to.contain("0");
          expect($el).to.contain("head");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 1) {
          expect($el).to.contain("new2");
          expect($el).to.contain("1");
          expect($el).to.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

      //Удаляем первый

      cy.contains("Удалить").click();
      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.not.contain("new1");
          expect($el).to.contain("0");
          expect($el).to.not.contain("head");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 1) {
          expect($el).to.contain("new2");
          expect($el).to.contain("1");
          expect($el).to.contain("head");
          expect($el).to.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.not.contain("new1");
          expect($el).to.contain("0");
          expect($el).to.not.contain("head");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 1) {
          expect($el).to.contain("new2");
          expect($el).to.contain("1");
          expect($el).to.contain("head");
          expect($el).to.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

      //Удаляем второй
      cy.contains("Удалить").click();
      cy.get("[class*=circle_content]").each(($el) => {
        expect($el).to.not.contain("new2");
        expect($el).to.not.contain("new1");
        expect($el).to.not.contain("head");
        expect($el).to.not.contain("tail");
        cy.wrap($el)
          .find("[class*=circle_circle]")
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      });
    });

    it("Корректно работает кнопка 'очистить'", function () {
      // Добавляем 2 элемента
      cy.get("input").type("new1");
      cy.contains("Добавить").click();
      cy.get("input").type("new2");
      cy.contains("Добавить").click();
      cy.get("input").type("new3");
      cy.contains("Добавить").click();

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("new1");
          expect($el).to.contain("0");
          expect($el).to.contain("head");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 1) {
          expect($el).to.contain("new2");
          expect($el).to.contain("1");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 2) {
          expect($el).to.contain("new3");
          expect($el).to.contain("2");
          expect($el).to.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

      cy.contains("Очистить").click();
      cy.get("[class*=circle_content]").each(($el) => {
        expect($el).to.not.contain("new3");
        expect($el).to.not.contain("new2");
        expect($el).to.not.contain("new1");
        expect($el).to.not.contain("head");
        expect($el).to.not.contain("tail");
        cy.wrap($el)
          .find("[class*=circle_circle]")
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      });
    });
  }); */
});
