import {FC} from "react";
import CloseImage from "../assets/img/close.png";
import "../assets/dice-styles.css"

interface DiceHowToPlayProps {
    onClose: () => void;
}

export const DiceRollHowToPlay: FC<DiceHowToPlayProps> = ({onClose}) => {
    return (
        <div className="how-to-play-overlay">
            <div className="how-to-play-dice">
                <div className="how-to-play-header">
                    <span className="dice-how-to-play-header-title">How to Play Dice Roll</span>
                    <img
                        className="cancel-help-how-to-play-btn"
                        src={CloseImage}
                        onClick={onClose}
                        alt="Close"
                    />
                </div>


                <div className="how-to-play-content">
                    <ol>
                        <li>
                            <strong>Ensure Sufficient Funds:</strong> Before starting, make sure you have enough money
                            in your account.
                        </li>
                        <li>
                            <strong>Set Your Bet:</strong> Use the '+' to increase and '−' to decrease your bet amount.
                            The minimum bet is 10 KSH.
                        </li>
                        <li>
                            <strong>Select Your Prediction:</strong> Choose whether the total sum of the dice will be
                            **Over 7.5** or **Under 7.5**.
                        </li>
                        <li>
                            <strong>Roll the Dice:</strong> Click the **Roll** button to roll three six-sided dice.
                        </li>
                        <li>
                            <strong>Results:</strong> The sum of the three dice will determine whether you win or lose:
                            <ul>
                                <li>If the sum is **8 or higher**, Over wins.</li>
                                <li>If the sum is **7 or lower**, Under wins.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Payouts:</strong> Winning bets will be paid out based on a multiplier system:
                            <ul>
                                <li>Lower sums (3-7) have higher multipliers.</li>
                                <li>Higher sums (8-18) have smaller multipliers but are more common.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Collect Winnings:</strong> If you win, your balance is updated accordingly. If you
                            lose, your bet is deducted.
                        </li>
                        <li>
                            <strong>Track Wins & Losses:</strong> At the top, you’ll see updates on your win/loss
                            history.
                        </li>
                        <li>
                            <strong>Keep Playing to Win:</strong> The more you play, the better your chances of hitting
                            big payouts!
                        </li>
                    </ol>
                    <p>If you have any questions, please refer to the help section or contact support.</p>
                </div>
            </div>
        </div>
    );
};
