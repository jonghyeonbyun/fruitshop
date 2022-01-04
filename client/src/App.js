import React, { Component, useEffect, useReducer, useState } from "react";
import FruitshopContract from "./contracts/Fruitshop.json";
import getWeb3 from "./getWeb3";

const App = () => {

  const [myApple,setMyApple] = useState(0);
  let initalState = {web3:null, instance:null, account:null};
  const [state,dispatch] = useReducer(reducer, initalState);

  function reducer(state,action){
    switch(action.type){
      case "INIT":
        let {web3, instance, account} = action
        return {
          ...state,
          web3,
          instance,
          account
        }
      }
  }
  const buyApple = async () => {
    let {instance, account, web3} = state;
    await instance.buyApple({
      from: account,
      value: web3.utils.toWei("10", "ether"),
      gas : 4612388,
    });
    setMyApple(prev => prev + 1);
  }

  const sellApple = async () => {
    let {instance, account, web3} = state;
    await instance.sellApple(web3.utils.toWei("10","ether"), {
      from: account,
      gas : 4612388,
    });
    setMyApple(0);
  }
  
  const getApple = async (instance) => {
    if(instance == null) return;
    let result = await instance.getMyApple();
    setMyApple(result.toNumber());
  }

  const getweb = async () => {
  const contract = require("@truffle/contract");

    let web3 = await getWeb3();
    let fruitshop = contract(FruitshopContract);
    fruitshop.setProvider(web3.currentProvider);

    let instance = await fruitshop.deployed();
    // 계정 가져오기
    let accounts = await web3.eth.getAccounts();

    let InitActions = {
      type : 'INIT',
      web3,
      instance,
      account:accounts[0]
    }

    dispatch(InitActions);

    getApple(instance);
    // 내 계정 : 0x86d401DC2F798485D6Ea4885467A946b885fcD4B
  
  }

  useEffect(()=> {
    getweb();
  }, []);

  return(
    <div>
      <h1>사과 가격 : 10 ETH</h1>
      <button onClick={()=>buyApple()}>BUY</button>
      <p>내가 가지고 있는 사과 : {myApple}</p>
      <button onClick={()=>sellApple()}>SELL (판매 가격은 : {myApple * 10} ETH)</button>
    </div>
  );
}

export default App;
