import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import MyNFT from "./MyNFT.json";

const contractAddress = "0x806d1e76729260ff3d956040011b5e93ec422d8c";

function App() {
  const [tokenURI, setTokenURI] = useState("");

  async function mintNFT() {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, MyNFT.abi, signer);

      const tx = await contract.mintNFT(tokenURI);
      await tx.wait();

      alert("✅ NFT Minted Successfully!");
    } catch (error) {
      console.error("Minting failed:", error);
      alert("❌ Minting Failed");
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Mint your NFT</h2>
      <input
        type="text"
        placeholder="Enter token URI (IPFS link)"
        value={tokenURI}
        onChange={(e) => setTokenURI(e.target.value)}
        style={{ width: "400px", padding: "10px", marginBottom: "10px" }}
      />
      <br />
      <button onClick={mintNFT} style={{ padding: "10px 20px" }}>
        Mint NFT
      </button>
    </div>
  );
}

export default App;
