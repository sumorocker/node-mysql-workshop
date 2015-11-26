var mysql = require('mysql');
var Table = require('cli-table');
var colors = require('colors');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});

//initialize the table
var table = new Table({
    head: ['id', 'email']
});

connection.query("select id, email from Account limit 5", function(err, ArrayOfRows) {
  // In this callback, rows will be all the rows of the query, in a regular array of regular objects
  // fields is not used very often, but it will contain a listing of the columns with some metadata
  if(err){
    console.log(err);
  }
  else if(ArrayOfRows){
    
    // console.log(ArrayOfRows);
    for(var i=0; i < ArrayOfRows.length; i++){
      // console.log(ArrayOfRows[i].id);
      table.push([
      ArrayOfRows[i].id.toString().bold, ArrayOfRows[i].email
        ]);
    }  
    console.log(table.toString());
  }
});

connection.end();

  // Here is an example usage:
  // rows.forEach(function(row) {
  //   console.log('#' + row.id + ': ' + row.email);
  // });
  // This code will output lines like:
  // #1: john@smith.com
  // #2: abc@def.com
  // #5: xx@yy.com
  
  // Note that IDs do not have to be contiguous. If we DELETE rows, there will be holes in the ID list. This is normal.
// });
