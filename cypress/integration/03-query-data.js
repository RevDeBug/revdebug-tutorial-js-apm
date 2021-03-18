describe('Query test data', () => {
      it('Query completed tasks', () => {
          cy.visit('http://localhost:3000/');
          cy.get('#query').type("SELECT task_name, priority, is_completed FROM tasks WHERE is_completed=0");
          cy.get('#send').click();
          cy.get('#result').should('have.value',
'[{"task_name":"buy grocieries","priority":5,"is_completed":0},{"task_name":"fill in taxes","priority":10,"is_completed":0},{"task_name":"feed the cat","priority":99,"is_completed":0}]');
          })
})
