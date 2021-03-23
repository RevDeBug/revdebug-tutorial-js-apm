describe('Query test data', () => {
      it('Query completed tasks', () => {
          cy.visit('http://localhost:3000/');
          cy.get('#query').type("SELECT * FROM tasks WHERE is_completed=1");
          cy.get('#send').click();
          cy.get('#result').should(($txtar) => {
              expect($txtar).to.contain.value('read morning brew');
          })
      })

      it('Query not completed tasks', () => {
          cy.visit('http://localhost:3000/');
          cy.get('#query').type("SELECT * FROM tasks WHERE is_completed=0");
          cy.get('#send').click();
          cy.get('#result').should(($txtar) => {
              expect($txtar).to.contain.value('feed the cat');
              expect($txtar).to.contain.value('fill in taxes');
              expect($txtar).to.contain.value('buy grocieries');
          })
      })

})
