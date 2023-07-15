# Minting And Transfering NFT

This Solidity program is used for transferring and minting the NFT's program that demonstrates how to transfer assests from one network to another. The purpose of this program is to serve as a starting point for those who are new to Solidity and want to get a feel for how it works.

## Description

In this Project we are using  Polygon Bridge for mapping purpose., this project seeks to establish an NFT collection on the Ethereum blockchain, and transfer assets. we are using Bing for image creation.


## Steps

1. Generating the NFT Collection
2. Storing Images on PintaCloud.
3.  Deploying the Smart Contract on groeli testnet.
4.  Implementing prompt description.
5.  Mapping the NFT Collection to Polygon.
6.  Batch Minting of NFTs.
7.  Batch Transferring NFTs to Polygon Mumbai.
   
## Getting Started

### Executing program
```shell

 npm install

```
After installing the dependencies, run the test file by using the following command:

```shell
npx hardhat 
```

To run this program, you can use Remix, an online Solidity IDE. To get started, go to the Remix website at https://remix.ethereum.org/.

Once you are on the Remix website, create a new file by clicking on the "+" icon in the left-hand sidebar. Save the file with a .sol extension (e.g., HelloWorld.sol). Copy and paste the following code into the file:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
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



```
Javascript Code
```javascript
const { ethers } = require("ethers");
async function transferAssets() {
  try {
    const sepoliaWebSocketUrl = "wss://eth-sepolia.g.alchemy.com/v2/_ONQmg4-ocJNzaNFyL8LcG1NeQ1pCGPZ";
    const sepoliaProvider = new ethers.providers.WebSocketProvider(sepoliaWebSocketUrl);

    const mumbaiWebSocketUrl = "Mss://polygon-mainnet.g.alchemy.com/v2/IxKGHttSvcea695xCfz7mZigM0EhYONHL";
    const mumbaiProvider = new ethers.providers.WebSocketProvider(mumbaiWebSocketUrl);

    const sepoliaPrivateKey = "6c999001ea1f95fe5f46927d275a5cb7e92283ead0f4eb05400988604d89a";
    const mumbaiPrivateKey = "a7120cd1660a9c276934d2384b44226a33e9492ef1850763162100148a";

    const sepoliaWallet = new ethers.Wallet(sepoliaPrivateKey, sepoliaProvider);
    const mumbaiWallet = new ethers.Wallet(mumbaiPrivateKey, mumbaiProvider);

    const sepoliaContractAddress = "0x096dc87756120e795796f421498829297f38bf18";
    const mumbaiContractAddress =  "0x13c2e2c188a35c11c4204fa27499445b456840ae";

    const sepoliaContract = new ethers.Contract(sepoliaContractAddress, sepoliaProvider).connect(sepoliaWallet);
    const mumbaiContract = new ethers.Contract(mumbaiContractAddress, mumbaiProvider).connect(mumbaiWallet);

    const assetIds = [1];

    for (const assetId of assetIds) {
      const assetOwner = await sepoliaContract.ownerOf(assetId);
      console.log(`Transferring asset to Mumbai testnet...`);

      const transferTx = await sepoliaContract.transferFrom(assetOwner, mumbaiContract.address, assetId);
      const txReceipt = await transferTx.wait();

      console.log(`Asset transferred successfully! Transaction hash: ${txReceipt.transactionHash}`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

transferAssets();
```

To compile the code, click on the "Solidity Compiler" tab in the left-hand sidebar. Make sure the "Compiler" option is set to "0.8.0" (or another compatible version), and then click on the "Compile HelloWorld.sol" button.

Once the code is compiled, you can deploy the contract by clicking on the "Deploy & Run Transactions" tab in the left-hand sidebar. 

Once the contract is deployed, you can interact with it by calling function.
## Authors

Govind Pandey

## License

This project is licensed under the MIT License.
