import './App.css';
import Button from './Button';
import Border from './Border';
import HandButton from './HandButton';
import Modal from './Modal';
import { useState } from 'react';

const Value = 'rock';

function Result(computer,me){
  const compare = compareHand(computer,me);
  if(compare > 0) return "승리";
  if(compare < 0) return "패배";
  return '무승부';
}
const Hands = ['rock','scissors','paper'];
const Wins = {
  rock :'scissor',
  scissors : 'paper',
  paper : 'rock'
}

function compareHand(a,b){
  if (Wins[a] === b) return 1;
  if (Wins[b] === a) return -1;
  return 0;
}
function Random(n){
  return Math.floor(Math.random() * n);
}
function RandomHand(){
  const random = Random(Hands.length);
  return Hands[random];
}

export default function App() { 
  const [hand,setHand] = useState(Value);
  const [otherHand,setotherHand] =useState(Value);
  const [gameHistory,setgameHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);
  const [modal,setModal] = useState(false)

  const ButtonClick = (nextHand) => {
    const nextOtherHand = RandomHand();
    const nextHistory = Result(nextHand,nextOtherHand);
    const compare = compareHand(nextHand,nextOtherHand)
    setHand(nextHand);
    setotherHand(nextOtherHand);
    setgameHistory([...gameHistory,nextHistory]);
    if (compare > 0) setScore(score + bet);
    if (compare < 0) setOtherScore(otherScore + bet);
  }

  const reset = () => {
    setHand(Value);
    setotherHand(Value);
    setgameHistory([]);
    setScore(0);
    setOtherScore(0);
    setBet(1);
  };

  const handleBetChange = (e) => {
    let num = Number(e.target.value);
    if (num > 5) num %= 6; 
    if (num < 1) num = 1;
    num = Math.floor(num);
    setBet(num);
  };

  return (
  <div id='box'>    
  <dl>
      <dt>게임 설명</dt>
      <dd>가위바위보를 해서 먼저 15점을 획득하는 사람이<br></br>승리하는 게임입니다</dd>
      <dd>*배점을 선택할 수 있습니다*</dd>
  </dl>
  <Button onClick={reset}>Reset</Button>
  <div id='container'>
    {score} : {otherScore}
  </div>
  <div id='contain'>
    <Border value={hand} />
      VS
    <Border value={otherHand} />
  </div>
  <div id='bet'>
  <input type="number" value={bet}
          min={1}
          max={5}
          onChange={handleBetChange}
        ></input>
  </div>
  <p>승부 기록: {gameHistory.join(", ")}</p>
    <div id='btn'>
      <HandButton value="rock" onClick={ButtonClick}>✊</HandButton>
      <HandButton value="scissors" onClick={ButtonClick}>✌</HandButton>
      <HandButton value="paper" onClick={ButtonClick}>✋</HandButton>
    </div>
    {
      score > 14 ? <Modal text={'🎉 이겼습니다 🎉'}/> : null
    }
    {
      otherScore > 14 ? <Modal text={'😭 졌습니다 😭'}/> :null
    }
  </div>
  );
}
