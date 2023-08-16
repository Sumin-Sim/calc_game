export default function Board(props) {
    // 무작위 숫자와 연산기호 출력 
    function change(n) {
        const contentBox = document.querySelector(`div#${props.team} ul li:nth-child(${n})>span`);
        const numBox = document.querySelector(`div#${props.team} ul li:nth-child(${n})>b`);
        if(n % 2 === 1) {
            let random = Math.ceil(Math.random() * 10);
            contentBox.style.display="none";
            numBox.innerHTML = random;
            props.record.splice(n - 1,1,random);
            props.setCount(props.count + 1);
        } else {
            let random = Math.ceil(Math.random() * 4);
            switch(random) {
                case 1: {
                    contentBox.style.display="none";
                    numBox.innerHTML = '+';
                    props.record.splice(n - 1,1,'+');
                };
                    break;
                case 2: {
                    contentBox.style.display="none";
                    numBox.innerHTML = '-';
                    props.record.splice(n - 1,1,'-');
                };
                    break;
                case 3: {
                    contentBox.style.display="none";
                    numBox.innerHTML = '×';
                    props.record.splice(n - 1,1,'*');
                };
                    break;
                case 4: {
                    contentBox.style.display="none";
                    numBox.innerHTML = '÷';
                    props.record.splice(n - 1,1,'/');
                };
            }
            props.setCount(props.count + 1);
        }
    }


    // 값 계산
    if(props.count >= 14) {
        calc();
    }

    function calc() {
        if(props.record.length > 2) {
            let ps = props.record.indexOf('+');
            let mn = props.record.indexOf('-');
            let mp = props.record.indexOf('*');
            let dv = props.record.indexOf('/');
        
            function posSet() {
                ps = props.record.indexOf('+');
                mn = props.record.indexOf('-');
                mp = props.record.indexOf('*');
                dv = props.record.indexOf('/');
            }
        
            function plus() {
                if(isNaN(props.record[ps + 1]) === true) {
                    let outcome = props.record[ps - 1] + Number(props.record[ps + 1]);
                    props.record.splice(ps - 1,3,outcome);
                } else {
                    let outcome = props.record[ps - 1] + props.record[ps + 1];
                    props.record.splice(ps - 1,3,outcome);
                }
                // console.log(props.record);
                posSet();
                return;
            }
            function minus() {
                if(isNaN(props.record[mn + 1]) === true) {
                    let outcome = props.record[mn - 1] - Number(props.record[mn + 1]);
                    props.record.splice(mn - 1,3,outcome);
                } else {
                    let outcome = props.record[mn - 1] - props.record[mn + 1];
                    props.record.splice(mn - 1,3,outcome);
                }
                // console.log(props.record);
                posSet();
                return;
            }
            function multiply() {
                if(isNaN(props.record[mp + 1]) === true) {
                    let outcome = props.record[mp - 1] * Number(props.record[mp + 1]);
                    props.record.splice(mp - 1,3,outcome);
                } else {
                    let outcome = props.record[mp - 1] * props.record[mp + 1];
                    props.record.splice(mp - 1,3,outcome);
                }
                // console.log(props.record);
                posSet();
                return;
            }
            function divide() {
                if(isNaN(props.record[dv + 1]) === true) {
                    let outcome = props.record[dv - 1] / Number(props.record[dv + 1]);
                    props.record.splice(dv - 1,3,outcome);
                } else {
                    let outcome = props.record[dv - 1] / props.record[dv + 1];
                    props.record.splice(dv - 1,3,outcome);
                }
                // console.log(props.record);
                posSet();
                return;
            }
        
            function calcMD() {
                while(mp > 0 && dv > 0) {
                    if(mp < dv) {
                        multiply();
                        divide();
                        if(mp > 0) {
                            multiply();
                        } else if(dv > 0) {
                            divide();
                        };
                    } else if(dv < mp) {
                        divide();
                        multiply();
                        if(mp > 0) {
                            multiply();
                        } else if(dv > 0) {
                            divide();
                        };
                    }
                }
                while(mp > 0 && dv < 0) {
                    while(mp > 0) {
                        multiply();
                        if(mp > 0) {continue};
                    }
                }
                while(dv > 0 && mp < 0) {
                    while(dv > 0) {
                        divide();
                        if(dv > 0) {continue};
                    }
                }
            }
            function calcPM() {  
                while(ps > 0 && mn > 0) {
                    if(ps < mn) {
                        plus();
                        minus();
                        if(ps > 0) {
                            plus();
                        } else if(mn > 0) {
                            minus();
                        };
                    } else if(mn < ps) {
                        minus();
                        plus();
                        if(ps > 0) {
                            plus();
                        } else if(mn > 0) {
                            minus();
                        };
                    }
                }
                while(ps > 0 && mn < 0) {
                    while(ps > 0) {
                        plus();
                        if(ps > 0) {continue};
                    }
                }
                while(mn > 0 && ps < 0) {
                    while(mn > 0) {
                        minus();
                        if(mn > 0) {continue};
                    }
                }
            }

            calcMD();
            calcPM();
        } else if(props.record.length === 1) {
            // console.log(Math.round(props.record) + '의 값');
        }
        return;
    }

    if(props.reset === 'y') {
        for(let i = 1 ; i <= 7 ; i ++) {
            // red
            const contentBoxR = document.querySelector(`div#red ul li:nth-child(${i})>span`);
            const numBoxR = document.querySelector(`div#red ul li:nth-child(${i})>b`);
            contentBoxR.style.display="block";
            numBoxR.textContent=""

            // blue
            const contentBoxB = document.querySelector(`div#blue ul li:nth-child(${i})>span`);
            const numBoxB = document.querySelector(`div#blue ul li:nth-child(${i})>b`);
            contentBoxB.style.display="block";
            numBoxB.textContent=""
        }

        props.setReset('n');
        props.setCount(0);
    }


// export
    return (
        <section className="board">
            <h2>{props.team} Team</h2>
            <ul>
                {/* {props.record.map((item,index) => (<li key={index + 1}><span onClick={() => change(index + 1)}></span></li>))} */}
                <li><span className="list" onClick={() => change(1)}></span><b></b></li>
                <li><span className="list" onClick={() => change(2)}></span><b></b></li>
                <li><span className="list" onClick={() => change(3)}></span><b></b></li>
                <li><span className="list" onClick={() => change(4)}></span><b></b></li>
                <li><span className="list" onClick={() => change(5)}></span><b></b></li>
                <li><span className="list" onClick={() => change(6)}></span><b></b></li>
                <li><span className="list" onClick={() => change(7)}></span><b></b></li>
            </ul>
        </section>
    );
}