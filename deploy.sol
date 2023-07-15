// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "erc721a/contracts/ERC721A.sol";
contract mint_nft is ERC721A {
    address public owner;
    uint256 public maxQuantity = 5;
    string baseUrl = "QmRaj2oh9zEJjwnZEbd5a1Z35K6YRUbzThVcVgD6s5g76k";
    string public prompt = "Create a NFT.";

    constructor() ERC721A("MyNFT", "NFT") {
        owner = msg.sender;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "only owner allowed!");
        _;
    }
    function mintNFT(uint256 quant) external payable onlyOwner {
        require(totalSupply() + quant <= maxQuantity, "Max limit is 5");
        _mint(msg.sender, quant);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUrl;
    }

    function promptDescription() external view returns (string memory) {
        return prompt;
    }
}

