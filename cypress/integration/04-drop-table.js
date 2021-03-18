describe('Drop the table', () => {
  it('Fill the drop table query', () => {
      cy.visit('http://localhost:3000/');
      cy.get('#query').type("DROP TABLE tasks");
  });
  it('Send the query to server', () => {
      cy.get('#send').click();
  });
  it('Check the server results', () => {
      cy.get('#result').should('have.value', '{"fieldCount":0,"affectedRows":0,"insertId":0,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}');
  });
})
