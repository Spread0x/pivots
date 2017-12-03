var ProofOfExistence1 = artifacts.require("./ProofOfExistence1.sol");
var ExampleToken = artifacts.require("./ExampleToken.sol");

module.exports = function(deployer) {
  deployer.deploy(ProofOfExistence1);
  deployer.deploy(ExampleToken);
};
