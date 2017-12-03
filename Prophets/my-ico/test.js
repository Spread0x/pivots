account1 = web3.eth.accounts[1]
GustavoCoinCrowdsale.deployed().then(inst => { crowdsale = inst })
crowdsale.token().then(addr => { tokenAddress = addr } )
gustavoCoinInstance = GustavoCoin.at(tokenAddress)
gustavoCoinInstance.balanceOf(account1).then(balance => balance.toString(10))
GustavoCoinCrowdsale.deployed().then(inst => inst.sendTransaction({ from: account1, value: web3.toWei(5, "ether")}))
gustavoCoinInstance.balanceOf(account1).then(balance => account1GusTokenBalance = balance.toString(10))
web3.fromWei(account1GusTokenBalance, "ether")

