import { Dispatch, FC, SetStateAction } from "react";
import { DiceBetHistory } from "./DiceBetHistory.tsx";

interface diceBetControlsProps {
    OnChangeBetAmount: Dispatch<SetStateAction<number>>;
    progressOverUnder: string;
    diceBetAmount: number;
    OnSetGame: (option: string) => void;
}

export const DiceBetControls: FC<diceBetControlsProps> = ({
                                                              OnChangeBetAmount,
                                                              diceBetAmount,
                                                              OnSetGame,
                                                          }) => {


    return (
        <div className="main-dice-controls-container">
            <div className="dice-bet-controls-title">Bet Amount</div>
            <div className="dice-controls-container">
                <div className="dice-controls-shortcuts-container">
                    <div className="dice-controls-shortcuts">
                        {[20, 50, 100, 500, 1000].map((value) => (
                            <div
                                className={`dice-controls-shortcuts-btn ${
                                    diceBetAmount === value ? "dice-shortcuts-select" : ""
                                }`}
                                key={value}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    OnChangeBetAmount(value)

                                }
                            }
                            >
                                {value}
                            </div>
                        ))}
                    </div>

                    <div className="dice-controls-input-container">
                        <div
                            className="dice-controls-plus-minus"
                            onClick={(e) => {
                                e.stopPropagation();
                                OnChangeBetAmount(prev => Math.max(prev - 10, 20))
                            }}
                        >
                            -
                        </div>

                        <input
                            className="dice-controls-input"
                            type="number"
                            value={diceBetAmount}
                            min={20}
                            max={1000}
                            step={10}
                            onChange={(e) =>
                                OnChangeBetAmount(
                                    Math.min(
                                        Math.max(Math.round(Number(e.target.value) / 10) * 10, 20),
                                        1000
                                    )
                                )
                            }
                        />

                        <div
                            className="dice-controls-plus-minus"
                            onClick={(e) => {
                                e.stopPropagation();
                                OnChangeBetAmount(prev => Math.min(prev + 10, 1000));
                            }}
                        >
                            +
                        </div>
                    </div>
                </div>

                <div className="dice-over-under-prediction">
                    {["under", "over"].map((option) => (
                        <div
                            key={option}
                            className="dice-over-under-btn"
                            style={{
                                backgroundImage:
                                    option === "over"
                                        ? "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)"
                                        : "linear-gradient(-225deg, #7742B2 0%, #F180FF 52%, #FD8BD9 100%)",
                            }}
                            onClick={() => OnSetGame(option)}
                        >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </div>
                    ))}
                </div>
            </div>

            <DiceBetHistory />
        </div>
    );
};
