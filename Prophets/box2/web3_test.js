const Web3 = require('web3');
const solc = require('solc');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

console.log(`${web3.eth.accounts}`);


const contract = `
pragma solidity ^0.4.18;

contract ProphetController {
  uint storedProphets;
  uint valll = 42;
  mapping(address => uint) public prophets;
  mapping(uint => string) public prophecy;

  uint prophecyCount;
  uint prophetsCount;
  address admin;

  function set(uint x) public {
    storedProphets = x;
    ValueUpdated(x, msg.sender);
  }

  function get() public view returns (uint) {
    return storedProphets;
  }

  string public message;
  function helloWorld() {
  	message = "test";
  }
  function sayHi() constant returns (uint) {
  	return valll;
  }



/////////////////////////////////////////////

  function addProphet() public {
  	prophets[msg.sender] = 1;
  	prophetsCount++;
  }  
  function shutdownProphet(address x) public {
  	 if (msg.sender == x || msg.sender == admin) {
        delete prophets[x];
     	prophetsCount--;
     }
  }

  function pingProphet(address x) public {
  	if(prophets[x] > 0) {
        IsProphetReady(x);
  	}
  }  
  function pongProphet(address x) public {
  	if (msg.sender == x) {
  		ProphetReady(x);
  	}
  }

  function orderProphecy(string prophecyBody) public {
  	prophecy[prophecyCount] = prophecyBody;
  	ProphecyOrdered(prophecyCount);
  }  
  function recievePropechy(address x, string result) public {
  	if (msg.sender == x) {
	  ProphecyCompleted(result);
  	}
  }  

  function myFunction() returns(uint256 myNumber, string myString) {
        return (23456, "Hello!%");
  }


  event Print(uint);
  function multiply(uint input) constant returns (uint) {
      Print(input * 7);
      return input * 7;
  }


  /*****
   **  Events
   *****/
  event IsProphetReady(address sender); 
  event ProphetReady(address sender); 
  event ProphetDestroyed(address sender);
  event ProphecyOrdered(uint prophecyId); 
  event ProphecyCompleted(string result); 
  event ValueUpdated(uint updatedValue, address sender); 
}
`;

var compile = solc.compile(contract);
var abi = JSON.parse(compile.contracts[":ProphetController"].interface);
let code = compile.contracts[":ProphetController"].bytecode;

var ethContract = new web3.eth.Contract(abi, {
	from: '0x80c33434FAec1162f79d8Ba3ae07f846Da9f246c',
	data: '0x'+code,
    gas: 3000000, 
    gasPrice: 20000
});
var deployedContract = ethContract.deploy({
    data: '0x'+code
}).send({
    from: '0x80c33434FAec1162f79d8Ba3ae07f846Da9f246c',
    gas: 3000000,
    gasPrice: '20000'
}, function(error, transactionHash){ console.log('error, transactionHash',error, transactionHash) })
.on('error', function(error){ console.log('error',error) })
.on('transactionHash', function(transactionHash){ console.log('transactionHash',transactionHash) })
.on('receipt', function(receipt){
   console.log(receipt.contractAddress) // contains the new contract address
})
.on('confirmation', function(confirmationNumber, receipt){ 
	console.log('confirmationNumber, receipt', confirmationNumber, receipt) 
})
.then(function(newContractInstance){
    console.log(newContractInstance.options.address) // instance with the new contract address
    //newContractInstance.methods.sayHi().call().then(console.log);
    newContractInstance.methods.sayHi().call({from: '0x80c33434FAec1162f79d8Ba3ae07f846Da9f246c'}, function(error, res){
    	console.log('multiply', error, res);
    });

newContractInstance.methods.sayHi().send({from: '0x80c33434FAec1162f79d8Ba3ae07f846Da9f246c'})
.then(function(receipt){
    	console.log('multiply', receipt);
});


});



console.log(deployedContract);


web3.eth.getAccounts(function(error, result) {
    if(error != null) {
        console.log("Couldn't get accounts");
    }
   console.log('Account 0 addr: ', result[0]);
	   web3.eth.getBalance('0x80c33434FAec1162f79d8Ba3ae07f846Da9f246c', function(error, resultr ) {
	   		console.log('Account 0 balance:', web3.utils.fromWei(resultr, 'ether') );

	   			web3.eth.sendTransaction({
	   				from: '0x80c33434FAec1162f79d8Ba3ae07f846Da9f246c', 
	   				to: '0xeb7f566b74CD681Ca7D5CbF6ffDf8B314Cc731D9', 
	   				value: web3.utils.toWei("0.1",'ether'), 
	   				gas: 4712388, 
	   				gasPrice: 100000000000
	   			});
	   })

   console.log('Account 1 addr: ', result[1])
	   web3.eth.getBalance(result[1], function(error, result ) {
	   		console.log('Account 1 balance:', web3.utils.fromWei(result, 'ether'));
	   			
	   })

   console.log('Account 2 addr: ', result[2])
	   web3.eth.getBalance(result[2], function(error, result ) {
	   		console.log('Account 2 balance:', web3.utils.fromWei(result, 'ether'));
	   			
	})

   console.log('Account 3 addr: ', result[3])
	   web3.eth.getBalance(result[3], function(error, result ) {
	   		console.log('Account 3 balance:', web3.utils.fromWei(result, 'ether'));		
	   })
});

/*
var deployedContractByAddr = new web3.eth.Contract(abi, '0x88d625dce9b639fe0072f06dec6a78591d93dfdd');
console.log('get contract by adress:', '0x88d625dce9b639fe0072f06dec6a78591d93dfdd');


deployedContractByAddr.methods.sayHi().call({from: '0xeb7f566b74CD681Ca7D5CbF6ffDf8B314Cc731D9'}, function(error, result){
    console.log('deployedContractByAddr.sayHi', error, JSON.stringify(result) );
});
*/
web3.version;

console.log(`${web3.isConnected}`);
