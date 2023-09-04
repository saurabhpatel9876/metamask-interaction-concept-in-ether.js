import "./App.css";
import { useState, useEffect } from "react";
import { ethers} from "ethers";
import detectEthereumProvider from '@metamask/detect-provider';

function App() {
  const { ethereum } = window;
  const [address, setAddress] = useState("connect wallet.... ");
  const [balance, setBalance] = useState("");
  // we will use useeffect here for account, change chainid
  useEffect(()=>{
    ethereum.on("accountsChanged",(accouts)=>{
      setAddress(accouts[0])
      const getbal = async()=>{
        const balance = await ethereum.request({
          method: "eth_getBalance",
          params: [accouts[0], "latest"],
        });
        setBalance(ethers.formatEther(balance))
      }
      getbal();
    })
    ethereum.on("chainChanged",(chain)=>{
      console.log(chain)
    })
  })
  // for giving option of changing network in my dapp 
  // const changeChain = async()=>{
  //   await ethereum.request({method:"wallet_addEthereumChain",
  // params:[
  //   {}
  // ]})
  // }
  // const switchChain = async()=>{
  //   await ethereum.request({method:"wallet_switchEthereumChain",
  // params:[
  //   {chainId:`0x13881`}
  // ]})
  // }
  // TRANSACTION IN METAMASK 
  const sendTx = async()=>{
    await ethereum.request({method:"eth_sendTransaction",
  params:[{
    to: '0x68FF53709d5Ebe539a746D892C552E6Fd61c7860' ,
    from: address,
    // value:'0xB1A2BC2EC50000', // here value is in hexadecimal
    value:`0x${(parseInt(ethers.parseEther('0.05'))).toString(16)}`,
    chaiId:'0xaa36a7',
  }]})
  }

  const requestAccount = async () => {
    // await ethereum.request({
    //   method: "wallet_requestPermissions",
    //   params: [
    //     {
    //       eth_accounts: {},
    //     },
    //   ],
    // });  ////it will give as array so used accounts[] and it will be for wallet permission
  // if we will comment out this wallet_permsis then we have to not connect agian and again
    const accouts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accouts); /// now it's for account request
    setAddress(accouts[0]);

    // balance check
    const balance = await ethereum.request({
      method: "eth_getBalance",
      params: [accouts[0], "latest"],
    }); // --> it will be in hexadecimal
    setBalance(ethers.formatEther(balance)) // here when i used utils then it shows error
  };
  return (
    <div className="App">
      <header className="App-header">
        <button className="App-link" onClick={requestAccount}>
          {address}
        </button>
        <a>{balance}</a>
        {/* <button onClick={switchChain}>
           switch
        </button> */}
        <button onClick={sendTx}>transaction</button>
      </header>
    </div>
  );
}

export default App;
