import {FC} from "react";

interface DicePopUpProps {
    winnings: number;
    odds: number
}

export const DicePopUp: FC<DicePopUpProps> = ({winnings, odds}) => {

    return (
        <div className="dice-pop-up-overlay">
            <div className="dice-pop-up-container">
                <div className="dice-pop-up-header"> {winnings > 0 ? "Win" : ""} </div>
                <div className="dice-pop-up-center"> {winnings}ksh</div>
                <div className="dice-pop-up-odds"> {odds}x</div>
            </div>
        </div>
    );
}