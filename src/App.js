import { useState } from 'react';

import Rule from './components/Rule';
import Team from './components/Team';
import Button from './components/Button';

import './font.css';
import './App.css';

export default function App() {
    const [reset,setReset] = useState('n')

    // 팀별 기록
    const [recordR,setRecordR] = useState([0,1,2,3,4,5,6]);
    const [recordB,setRecordB] = useState([0,1,2,3,4,5,6]);


    // 네모칸 열림 감지
    const [count,setCount] = useState(0);


    // 결과
    function showWinner() {
        if(count < 14) {
            alert('모든 네모칸을 클릭해주세요!');
        } else {
            if(Math.round(recordR) > Math.round(recordB)) {
                winR();
            } else if(Math.round(recordR) < Math.round(recordB)) {
                winB();
            } else if(Math.round(recordR) === Math.round(recordB)) {
                winNo();
            }
        }

        function winR() {
            alert(`red팀 승! red: ${Math.round(recordR)}점 / blue: ${Math.round(recordB)}점`);
        }
        function winB() {
            alert(`blue팀 승! red: ${Math.round(recordR)}점 / blue: ${Math.round(recordB)}점`);
        }
        function winNo() {
            alert(`무승부! red: ${Math.round(recordR)}점 / blue: ${Math.round(recordB)}점`);
        }
    }


    // reset
    function restart() {
        setReset('y');

        setRecordR([0,1,2,3,4,5,6]);
        setRecordB([0,1,2,3,4,5,6]);
        setCount(0);
    }
    
// export
    return (
        <div id="wrap">
            <div id="title">
                <h1>사칙연산 게임</h1>
                
                <Rule />
            </div>

            <article>
                <Team
                    team = "red"
                    record = {recordR}
                    setRecord = {setRecordR}
                    count = {count}
                    setCount = {setCount}
                    reset = {reset}
                    setReset = {setReset}
                />
                <Team
                    team = "blue"
                    record = {recordB}
                    setRecord = {setRecordB}
                    count = {count}
                    setCount = {setCount}
                    reset = {reset}
                    setReset = {setReset}
                />
            </article>
            
            <div className="btn">
                <Button
                    clickEvent = {showWinner}
                >결과보기</Button>
                <Button
                    clickEvent = {restart}
                >다시하기</Button>
            </div>
        </div>
    );
}