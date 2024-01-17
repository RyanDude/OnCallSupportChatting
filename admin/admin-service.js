connection = require('../mysql/mysql-config');

class AdminService{
   reg = (name, password)=>{
    connection.connect((err) => {
        if (err) {
          console.error('Error connecting to MySQL:', err);
          return;
        }
        console.log('Connected to MySQL database');
        
        const query = 'insert into admin(name, password) values(?, ?)';
        connection.query(query, [name, password], (err, results, fields) => {
            if (err) {
              console.error('Error executing query:', err);
              return;
            }
        
            // Process the results
            console.log('Query results:', results);
        
            // Close the connection after executing the query
            connection.end((err) => {
              if (err) {
                console.error('Error closing connection:', err);
              } else {
                console.log('Connection closed');
              }
            });
          });
      });
   }
   login = (name, password)=>{
    connection.connect((err) => {
        if (err) {
          console.error('Error connecting to MySQL:', err);
          return;
        }
        console.log('Connected to MySQL database');
        
        const query = 'select * from admin where name=? and password=?';
        connection.query(query, [name, password], (err, results, fields) => {
            if (err) {
              console.error('Error executing query:', err);
              return;
            }
        
            // Process the results
            console.log('Query results:', results);
        
            // Close the connection after executing the query
            connection.end((err) => {
              if (err) {
                console.error('Error closing connection:', err);
              } else {
                console.log('Connection closed');
              }
            });
          });
      });
   }
}
module.exports = AdminService;