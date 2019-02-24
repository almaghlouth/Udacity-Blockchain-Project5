# Decentralized Star Notary Service

## Abdullah's Token

- Token Name: Abdullah's Token
- Token Symbol: ABT
- Token Address on Rinkeby: 0xF55cA57f3437a9Fbef7C47585BE791276938E3DE
- Link: https://rinkeby.etherscan.io/token/0xf55ca57f3437a9fbef7c47585be791276938e3de

## Install And config

due to the outdated boilerPlateDAPPproject solidity version
run this app on Truffle v4.1.15 by installing is as global through

    npm install -g truffle@4.1.15

then cd to the folder

    npm install
    truffle develop
    compile
    test
    migrate --reset

and from a second terminal run

    npm run dev

ensure metamask configured to run on truffle develop at custom RPC http://127.0.0.1:9545/

also to use rinkeby add your mnemonic and the infura link in truffle.js
