//import 'babel-polyfill';
const StarNotary = artifacts.require('./starNotary.sol')


let instance;
let accounts;

contract('StarNotary', async(accs) => {
    accounts = accs;
    instance = await StarNotary.deployed();
});

it('can Create a Star', async() => {
    let tokenId = 1;
    await instance.createStar('Awesome Star!', tokenId, { from: accounts[0] })
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
});

it('lets user1 put up their star for sale', async() => {
    let user1 = accounts[1]
    let starId = 2;
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, { from: user1 })
    await instance.putStarUpForSale(starId, starPrice, { from: user1 })
    assert.equal(await instance.starsForSale.call(starId), starPrice)
});

it('lets user1 get the funds after the sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 3
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, { from: user1 })
    await instance.putStarUpForSale(starId, starPrice, { from: user1 })
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user1)
    await instance.buyStar(starId, { from: user2, value: starPrice })
    let balanceOfUser1AfterTransaction = web3.eth.getBalance(user1)
    assert.equal(balanceOfUser1BeforeTransaction.add(starPrice).toNumber(), balanceOfUser1AfterTransaction.toNumber());
});

it('lets user2 buy a star, if it is put up for sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 4
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, { from: user1 })
    await instance.putStarUpForSale(starId, starPrice, { from: user1 })
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
    await instance.buyStar(starId, { from: user2, value: starPrice });
    assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 5
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, { from: user1 })
    await instance.putStarUpForSale(starId, starPrice, { from: user1 })
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
    const balanceOfUser2BeforeTransaction = web3.eth.getBalance(user2)
    await instance.buyStar(starId, { from: user2, value: starPrice, gasPrice: 0 })
    const balanceAfterUser2BuysStar = web3.eth.getBalance(user2)
    assert.equal(balanceOfUser2BeforeTransaction.sub(balanceAfterUser2BuysStar), starPrice);
});

// Write Tests for:

// 1) The token name and token symbol are added properly.
// 2) 2 users can exchange their stars.
// 3) Stars Tokens can be transferred from one address to another.

it('token name check', async() => {
    assert.equal(await instance.name.call(), "Abdullah's Token")
});

it('token symbol check', async() => {
    assert.equal(await instance.symbol.call(), "ABT")
});

it('can get star name from token id', async() => {
    let tokenId = 8;
    await instance.createStar('test star', tokenId, { from: accounts[0] })
    assert.equal(await instance.lookUptokenIdToStarInfo.call(tokenId), 'test star')
});

it('exchage stars between two users', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starA = 6
    let starB = 14
    let starPrice = web3.toWei(.02, "ether")
    await instance.createStar('StarA', starA, { from: user1 })
    await instance.createStar('StarB', starB, { from: user2 })
    await instance.putStarUpForSale(starB, starPrice, { from: user2 })
    await instance.exchangeStars(starA, starB, { from: user1 })
    let ownerA = await instance.ownerOf.call(starA);
    let ownerB = await instance.ownerOf.call(starB);
    assert.equal(ownerA + ownerB, user2 + user1);
});

it('exchage stars between two users', async() => {
    let tokenId = 15;
    await instance.createStar('test star', tokenId, { from: accounts[1] })
    await instance.transferStar(accounts[2], tokenId, { from: accounts[1] })
    let owner = await instance.ownerOf.call(tokenId);
    assert.equal(owner, accounts[2]);
});