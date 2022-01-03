// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Fruitshop {

  mapping(address=>uint) myApple;
  constructor() public {
  }

  function buyApple() payable public{ // 사과를 구매했을 시, 해당(주소)에 사과를 추가해주는 코드
    myApple[msg.sender]++;
  }
  
  function getMyApple() public view returns(uint){
    return myApple[msg.sender];
  }
  
  function sellApple(uint _applePrice) payable external{
    uint totalPrice = (myApple[msg.sender] * _applePrice);

    myApple[msg.sender] = 0;
    msg.sender.transfer(totalPrice);
  }


}
