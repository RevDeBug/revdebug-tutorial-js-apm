describe('Create table test', () => {
  it('Fill the create table query', () => {
      cy.visit('http://localhost:3000/');
      cy.get('#query').type("CREATE TABLE IF NOT EXISTS tasks ({enter}" +
        "task_id INT AUTO_INCREMENT PRIMARY KEY,{enter}"+
        "task_name VARCHAR(255) NOT NULL,{enter}"+
        "is_completed BOOLEAN NOT NULL DEFAULT FALSE,{enter}"+
        "priority TINYINT NOT NULL,{enter}"+
        "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP{enter}"+
        ")");
  });
  it('Send the query to server', () => {
      cy.get('#send').click();
  });
  it('Check the server results', () => {
      cy.get('#result').should('have.value', '{"fieldCount":0,"affectedRows":0,"insertId":0,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}');
  });
})
