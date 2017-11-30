pragma solidity ^0.4.18;

contract SimpleStorage {
  uint storedData;

  function set(uint x) public {
    storedData = x;
    ValueUpdated(x, msg.sender);
  }
  event ValueUpdated(uint updatedValue, address sender); 

  function get() public view returns (uint) {
    return storedData;
  }
}
