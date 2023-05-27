describe("Тестирование разворота строки", () => {
  beforeEach(() => {
    cy.visit("recursion");
  });

  it("Пустой инпут", () => {
    cy.get("input").should("have.value", "");
    cy.contains("Развернуть").should("be.disabled");
    cy.get("input").type("qwert").should("have.value", "qwert");
    cy.contains("Развернуть").should("not.be.disabled");
  });

  it("Корректность разворота строки", () => {
    cy.get("input").type("QWERT");
    cy.contains("Развернуть").click();
    cy.get('div[class*="circle_circle"]').as("circles");

    cy.get("@circles").should(($lis) => {
      expect($lis).to.have.length(5);
      expect($lis.eq(0))
        .to.contain("Q")
        .to.have.css("border-color", "rgb(210, 82, 225)");
      expect($lis.eq(1))
        .to.contain("W")
        .to.have.css("border-color", "rgb(0, 50, 255)");
      expect($lis.eq(2))
        .to.contain("E")
        .to.have.css("border-color", "rgb(0, 50, 255)");
      expect($lis.eq(3))
        .to.contain("R")
        .to.have.css("border-color", "rgb(0, 50, 255)");
      expect($lis.eq(4))
        .to.contain("T")
        .to.have.css("border-color", "rgb(210, 82, 225)");
    });

    cy.wait(1000);
    cy.get("@circles").should(($lis) => {
      expect($lis).to.have.length(5);
      expect($lis.eq(0))
        .to.contain("T")
        .to.have.css("border-color", "rgb(127, 224, 81)");
      expect($lis.eq(1))
        .to.contain("W")
        .to.have.css("border-color", "rgb(210, 82, 225)");
      expect($lis.eq(2))
        .to.contain("E")
        .to.have.css("border-color", "rgb(0, 50, 255)");
      expect($lis.eq(3))
        .to.contain("R")
        .to.have.css("border-color", "rgb(210, 82, 225)");
      expect($lis.eq(4))
        .to.contain("Q")
        .to.have.css("border-color", "rgb(127, 224, 81)");
    });

    cy.wait(1000);
    cy.get("@circles").should(($lis) => {
      expect($lis).to.have.length(5);
      expect($lis.eq(0))
        .to.contain("T")
        .to.have.css("border-color", "rgb(127, 224, 81)");
      expect($lis.eq(1))
        .to.contain("R")
        .to.have.css("border-color", "rgb(127, 224, 81)");
      expect($lis.eq(2))
        .to.contain("E")
        .to.have.css("border-color", "rgb(127, 224, 81)");
      expect($lis.eq(3))
        .to.contain("W")
        .to.have.css("border-color", "rgb(127, 224, 81)");
      expect($lis.eq(4))
        .to.contain("Q")
        .to.have.css("border-color", "rgb(127, 224, 81)");
    });
  });
});
