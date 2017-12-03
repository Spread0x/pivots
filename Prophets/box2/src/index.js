import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Web3 from 'web3'


const web3Promise = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function() {
    var results
    var web3 = window.web3

    
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)

      results = {
        web3: web3
      }

      console.log('Injected web3 detected.');

      resolve(results)
    } else {
      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      var provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545')

      web3 = new Web3(provider)
      console.log(web3.version)
      console.log(web3.isConnected)

      results = {
        web3: web3
      }

      console.log('No web3 instance injected, using Local web3.');
      window.web3 = web3;



      resolve(results)
    }
  })
});

console.log(web3Promise);


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
