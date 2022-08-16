import { ethers } from 'ethers';
import React , { useEffect, useState } from 'react';
import './App.css';
import abi from "./utils/WavePortal.json"

function App() {

  //store user's public wallet
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const {ethereum} = window;  //First make sure we have access to window.ethereum

      !ethereum ? console.log("Make sure you have metamask") : console.log("We have ethereum object",ethereum);

      //check if we're authorized to access the user's wallet
      const accounts = await ethereum.request({method: "eth_accounts"});

      if (accounts.length !== 0) {
        const account = accounts[0];  //if user have multiple account, we're accessing first account
        console.log("Found an authorized account:", account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  //implement connect wallet method
  const connectWallet = async () => {
    try {
      const {ethereum} = window;

      //if metamask is not found send alert
      if (!ethereum) {
        alert("Get Metamask!");
        return;
      }

      //request metamask for users accounts
      const accounts = await ethereum.request({method: "eth_requestAccounts"});

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); //setCurrentAccount to first account from wallet
    } catch (error) {
        console.log(error);
    }
  }

  const wave = async () => {
    try {
      const {ethereum} = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum); //A "Provider" is what we use to actually talk to Ethereum nodes. 
        
        //A Signer in ethers is an abstraction of an Ethereum Account, 
        //which can be used to sign messages and transactions and send signed 
        //transactions to the Ethereum Network to execute state changing operations.
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        //getTotalWaves() function from contract  
        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrived total wave count...", count.toNumber());

        //write to smart contract
        //Execute the actual wave from your smart contract
        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...",waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ",waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  },[]);

  return (
    <div className= "mainContainer">

      <div className="dataContainer">
        <div className="header">
          <h1>Wave Me</h1>
        </div>

        <div className="bio">
          <p>Hi, I'm Kunal, I'm learning blockchain development with this simple wave portal I made my first web3 project</p>          
        </div>

        <button className="waveButton" onClick= {wave}>
          Wave at me
        </button>

        {/* If there is no currentAccount render this button */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
