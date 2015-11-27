var mysql = require('mysql');

var connection = mysql.createConnection({
    user: 'sumorocker',
    host: '127.0.0.1',
    database: 'addressbook'
});

connection.query('select Account.id as accountId, AddressBook.name as addressBookName, AddressBook.id as addressBookId, Account.email as accountEmail from Account join AddressBook on Account.id=AddressBook.accountId', function(err, results) {
    if (err) {
        console.log("error");
    }
    else {
        var ACCOUNTS = {}
        var addressBooks = {}

        results.forEach(function(row) {

            var account = {
                accountId: row.accountId,
                accountEmail: row.accountEmail,
                AddressBooks: []
            };

            var addressBook1 = {
                addressBookId: row.addressBookId,
                addressBookName: row.addressBookName
            }

            ACCOUNTS[account.accountId] = account;
            addressBooks[addressBook1.addressBookId] = addressBook1;

        })

        var newAccount = []
        results.forEach(function(row) {

            var account = ACCOUNTS[row.accountId];
            var addressBooks1 = addressBooks[row.addressBookId];

            account.AddressBooks.push(addressBooks1.addressBookName);
            if (newAccount.indexOf(account) === -1) {
                newAccount.push(account)
            }
    
        })
        pushAccounts.forEach(function(account){
       console.log(account.id+ '. '+ account.email);
       account.books.forEach(function(book) {
           console.log('    ' + book);
       })
    }

   
});

connection.end();