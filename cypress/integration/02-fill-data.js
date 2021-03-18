// test data definition:
var tasks=[ {task_name:'buy grocieries',         priority: 5,   completed: 0 },
            {task_name:'fill in taxes',          priority: 10,  completed: 0 },
            {task_name:'read morning brew blog', priority: 1,   completed: 1 },
            {task_name:'feed the cat',           priority: 99,  completed: 0 }];

describe('Fill test data', () => {
   tasks.forEach((item) => {
      it('Insert task:' + item.task_name, () => {
          cy.visit('http://localhost:3000/');
          cy.get('#query').type("INSERT INTO tasks (task_name, priority, is_completed) "+
                                "VALUES('"+item.task_name+"', "+item.priority+","+item.completed+")");
          cy.get('#send').click();
          cy.get('#result').should(($txtar) => {
              expect($txtar).to.contain.value('"affectedRows":1');
          })
      })
   })
})
