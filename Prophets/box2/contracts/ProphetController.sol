pragma solidity ^0.4.18;

contract ProphetController {
  uint storedProphets;
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



/////////////////////////////////////////////

  function addProphet(address x) public {
  	prophets[msg.sender] = 1;
  	prophetsCount++;
  }  
  function shutdownProphet(address x) public {
  	 if (msg.sender == x || msg.sender == admin) {
        delete itemList[x];
     	prophetsCount--;
     }
  }

  function pingProphet(address x) public {
  	if(prophets[x].isValue) {
        IsProphetReady(x);
  	}
  }  
  function pongProphet(address x) public {
  	if (msg.sender == x) {
  		ProphetReady(x);
  	}
  }

  function orderProphecy(string prophecy) public {
  	prophecy[prophecyCount] = prophecy;
  	ProphetDestroyed(prophecyCount);
  }  
  function recievePropechy(address x, string result) public {
  	if (msg.sender == x) {
	  ProphecyCompleted(result);
  	}
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
