describe("Доступность приложения", () => {
  it("Проверка работоспособности приложения", () => {
    cy.visit("http://localhost:3000");
  });

  it("Проверка доступности всех страниц", () => {
    cy.visit("/");
    cy.get("a").each((page) => {
      cy.request(page.prop("href"));
    });
  });
});
