import Board from './Board';

export default function Team(props) {
    
    
    return (
        <div id={props.team} className="team">
            <Board
                team = {props.team}
                record = {props.record}
                setRecord = {props.setRecord}
                count = {props.count}
                setCount = {props.setCount}
                reset = {props.reset}
                setReset = {props.setReset}
            />
        </div>
    );
}