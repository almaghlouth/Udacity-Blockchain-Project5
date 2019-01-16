// Allows us to use ES6 in our migrations and tests.
require('babel-register');
var HDWalletProvider = require("truffle-hdwallet-provider");
// Edit truffle.config file should have settings to deploy the contract to the Rinkeby Public Network.
// Infura should be used in the truffle.config file for deployment to Rinkeby.

module.exports = {
    networks: {
        rinkeby: {
            provider: function() {
                // in this part fill your mnemonic and the infura link
                return new HDWalletProvider("my mnemonic were here",
                    "https://rinkeby.infura.io/v3/my-infura-API");
            },
            network_id: 1
        },
        test: {
            host: '127.0.0.1',
            port: 8545,
            network_id: '*' // Match any network id
        },
        development: {
            host: '127.0.0.1',
            port: 9545,
            network_id: '*' // Match any network id
        },
        ganache: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*' // Match any network id
        },

    },
    compilers: {
        solc: {
            version: "0.4.24", // ex:  "0.4.20". (Default: Truffle's installed solc)
        }
    }
}