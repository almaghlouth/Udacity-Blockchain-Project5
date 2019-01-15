pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 {

    string public constant name = "Abdullah's Token";


    struct Star {
        string name;
    }

//  Add a name and a symbol for your starNotary tokens
    string public constant symbol = "ABT";
    uint8 public constant decimals = 18; 
//

    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;

    function createStar(string _name, uint256 _tokenId) public {
        Star memory newStar = Star(_name);

        tokenIdToStarInfo[_tokenId] = newStar;

        _mint(msg.sender, _tokenId);
    }

// Add a function lookUptokenIdToStarInfo, that looks up the stars using the Token ID, and then returns the name of the star.
    function lookUptokenIdToStarInfo(uint256 _tokenId) public returns (string){
        require(_exists(_tokenId) == true);
        return tokenIdToStarInfo[_tokenId].name ;
    }
//

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender);

        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable {
        require(starsForSale[_tokenId] > 0);

        uint256 starCost = starsForSale[_tokenId];
        address starOwner = ownerOf(_tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);

        starOwner.transfer(starCost);

        if(msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }
        starsForSale[_tokenId] = 0;
      }

// Add a function called exchangeStars, so 2 users can exchange their star tokens...
//Do not worry about the price, just write code to exchange stars between users.
    function exchangeStars(uint256 _sentTokenId, uint256 _returnTokenId) public {
        require(starsForSale[_returnTokenId] > 0);
        require(ownerOf(_sentTokenId) == msg.sender);
        address starOwner = ownerOf(_returnTokenId);
        _removeTokenFrom(msg.sender, _sentTokenId);
        _addTokenTo(starOwner, _sentTokenId);
        _removeTokenFrom(starOwner, _returnTokenId);
        _addTokenTo(msg.sender, _returnTokenId);
      }
//

// Write a function to Transfer a Star. The function should transfer a star from the address of the caller.
// The function should accept 2 arguments, the address to transfer the star to, and the token ID of the star.
    function transferStar(address _address, uint256 _TokenId) public {
        require(ownerOf(_TokenId) == msg.sender);
        _removeTokenFrom(msg.sender, _TokenId);
        _addTokenTo(_address, _TokenId);
      }
//

}
