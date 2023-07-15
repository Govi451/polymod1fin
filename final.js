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
