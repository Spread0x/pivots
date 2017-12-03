const Web3 = require('web3');
const solc = require('solc');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

console.log(`${web3.eth.accounts}`);


web3.eth.getAccounts(function(error, result) {
    if(error != null) {
        console.log("Couldn't get accounts");
    }
   console.log('Account 0 addr: ', result[0])
	   web3.eth.getBalance(result[0], function(error, result ) {
	   		console.log('Account 0 balance:', result);	
	   })

   console.log('Account 1 addr: ', result[1])
	   web3.eth.getBalance(result[1], function(error, result ) {
	   		console.log('Account 1 balance:', result);	
	   })

   console.log('Account 2 addr: ', result[2])
	   web3.eth.getBalance(result[2], function(error, result ) {
	   		console.log('Account 2 balance:', result);	
	   })

   console.log('Account 3 addr: ', result[3])
	   web3.eth.getBalance(result[3], function(error, result ) {
	   		console.log('Account 3 balance:', result);	
	   })


});


console.log(`${web3.isConnected}`);
