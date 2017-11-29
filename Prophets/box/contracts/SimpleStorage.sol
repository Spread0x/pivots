pragma solidity ^0.4.18;

contract SimpleStorage {
  uint storedData;
  string storedString;
  //mapping(address => uint) public historyForInt;
  //mapping(address => string) public historyForString;

 

  // Events

  event ValueUpdated(uint updatedValue, address sender); 
  event StringValueUpdated(string updatedValue, address sender); 

  // Setters

  function set(uint x) public {
    storedData = x;
    ValueUpdated(x, msg.sender);
  }

  function setString(string x) public {
    storedString = x;
    StringValueUpdated(x, msg.sender);
  }

  // Getters
  function getString() public view returns (string) {
    return storedString;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
