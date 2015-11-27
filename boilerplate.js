var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.IP,
  user: process.env.C9_USER,
  database: 'addressbook'
});

connection.query('select Account.id, AddressBook.name, Account.email from Account join AddressBook on Account.id=AddressBook.accountId', function(err, results) {
  if(err){
    console.log("error")
  }
  else {
    
  var newAccount = []
  
  results.forEach(function(oldAccount, index) {
    var found;
    var counter;
    
    newAccount.forEach(function(oldAccount, index) {
      if (newAccount.id === oldAccount.id) {
        found = true;
        counter = index;
      }
    })
    if (!found) {
      var account = {
        id: oldAccount.id,
        email: oldAccount.email,
        books: [oldAccount.name]
      };
      newAccount.push(account);
    }
    else {
      newAccount[counter].books.push(oldAccount.name);
    }
  })
    newAccount.forEach(function(account){
      console.log(account.id+ '. '+ account.email);
      account.books.forEach(function(book) {
          console.log('    ' + book);
      })
  })
}
  connection.end();
});

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
