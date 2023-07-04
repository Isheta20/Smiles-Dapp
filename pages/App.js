import './App.css';
import {useState} from 'react';
import contractAbi  from './EthAvaxAssessment.sol/EthAvaxAssessment.json';
const ethers = require("ethers");


function App() {
  const [smile, setSmile] = useState(undefined);
  const [address, setAddress]  = useState('Connect Wallet');

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
  
  const walletProvider = new ethers.providers.Web3Provider(window.ethereum);//signer will help to send data to our smart contract
  const signer = walletProvider.getSigner();
  
  const getContractData = new ethers.Contract(
    contractAddress,
    contractAbi.abi,
    provider  
  )
  const sendContractTx = new ethers.Contract(
    contractAddress,
    contractAbi.abi,
    signer
  )
  const requrestAccount = async() => {
    // console.log(await provider.getCode(contractAddress));

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    // console.log(accounts);//displays the accounts that are connected, after connecting you can switch between accounts
    setAddress(accounts[0]);
  }

  const addSmile = async() => {
    console.log("added");
    // totalSmiles+=1;
    const add = await sendContractTx.recieveSmile();
    await add.wait();
    getTotalSmiles();//to set the new value of smile
    // console.log("Inside addsmile",smile);
  }
  
  const subSmile = async() => {
    console.log("sub ");
    const sub = await sendContractTx.sendSmile();
    await sub.wait();
    getTotalSmiles();
    // totalSmiles-=1;
  }

  const getTotalSmiles = async() => {
    console.log("total");
    // const data = await (getContractData.getTotalSmiles()).toNumber();
    const data = await getContractData.getTotalSmiles();
    const count = parseInt(data._hex);
    // console.log("data",count);
    setSmile(count);
    // console.log("after setting smile",smile);

  }
  
  return (
    <main className="Container">
        <header><h1>Hello, Isheta here!</h1></header>
        <p>Click on the button to send a smile or the other button to recieve a smile!</p>
        <div><button onClick={requrestAccount}>{address}</button></div>
        <button onClick={addSmile}>Send Smile</button>
        <button onClick={subSmile}>Recieve Smile</button>
        <p>Smiles: {smile}</p>
    </main>
  );
}

export default App;
// 0x5FbDB2315678afecb367f032d93F642f64180aa3