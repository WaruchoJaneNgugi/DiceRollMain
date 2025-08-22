import {DiceBetControls} from "./DiceBetControls.tsx";
import "../assets/dice-styles.css"
import {useCallback, useEffect, useState} from "react";
import {useDiceWebSocket} from "../Hooks/useDiceWebSocket.ts";
import {DiceResultsData, DiceSendData} from "../Utils/types.ts";
import {useDiceAudioControl} from "../Hooks/useDiceSound.ts";
import {DiceCanvas} from "./DiceCanvas.tsx";
import {ProgressBar} from "./ProgressBar.tsx";
import {DicePopUp} from "./DicePopUp.tsx";
import {DiceRollHowToPlay} from "./DiceRollHowToPlay.tsx";
import settingsIcon from "../assets/img/settings.png";
import closeIcon from "../assets/img/close.png";
import diceLogo from "../assets/img/DiceRoll-logo.png";
import {DiceRollSettingsDialog} from "./DiceRollSettingsDialog.tsx";
export const MainDice = () => {
    const [progressOverUnder, setProgressOverUnder] = useState<string>("over");
    const [diceBetAmount, setDiceBetAmount] = useState<number>(1);
    const [diceGameActive, setDiceGameActive] = useState<boolean>(false);
    const [diceIsSpinning, setDiceIsSpinning] = useState<boolean>(false);
    const [DiceOutcomeSum, setDiceOutcomeSum] = useState<number>(0);
    const [diceOutcome, setDiceOutcome] = useState<number[]>([1, 2, 4]);
    const [showDicePopUp, setShowDicePopUp] = useState<boolean>(false);
    const [odds, setOdds] = useState<number>(0);
    const [amountWon, setAmountWon] = useState<string>("");
    const [previousSums, setPreviousSums] = useState<number[]>([]);
    const {getDiceSocket, sendDiceData, DiceConnectSocket} = useDiceWebSocket()
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const {playDiceSound, playDiceLoop} = useDiceAudioControl(isMuted, true)
    const [balance, setBalance] = useState<string>("---");

    useEffect(() => {
        DiceConnectSocket();
        if (DiceOutcomeSum > 0) {
            setPreviousSums(prev => {
                const updatedSums = [...prev, DiceOutcomeSum];
                return updatedSums.length > 4 ? updatedSums.slice(-4) : updatedSums;
            });
        }
        if (Number(amountWon) > 0) {
            setShowDicePopUp(true);
            playDiceSound("WinSnd");
        } else if (Number(amountWon) === 0 && DiceOutcomeSum > 0) {
            playDiceSound("LoseSnd");
        }
        const timer = setTimeout(() => {
            setShowDicePopUp(false);
            setAmountWon("");
            setDiceOutcomeSum(0);
        }, 2000);

        return () => clearTimeout(timer);

    }, [DiceConnectSocket, amountWon, DiceOutcomeSum, odds, playDiceSound]);

    const HandleDiceStart = useCallback((option: string) => {
        if (diceGameActive) return;
        const socket = getDiceSocket();
        if (!socket || socket.readyState !== WebSocket.OPEN) return;
        setProgressOverUnder(option);
        setDiceGameActive(true);
        setDiceIsSpinning(true);
        playDiceLoop();
        // const queryParams = new URLSearchParams(window.location.search);
        // const sess = queryParams.get("sess") || " ";
        const DiceData: DiceSendData = {
            // msisdn: sess,
            msisdn:"254791847766",
            option: option === "over" ? "OVER" : "UNDER",
            amount: diceBetAmount
        }
        sendDiceData(DiceData);
    }, [diceBetAmount, diceGameActive, getDiceSocket, playDiceLoop, sendDiceData]);

    useEffect(() => {
        const socket = getDiceSocket();
        if (!socket) return;

        const handleSocketMessage = (event: MessageEvent) => {
            try {
                const data: DiceResultsData = JSON.parse(event.data);
                setTimeout(() => {
                    setDiceIsSpinning(false);
                    setDiceOutcome(data.dices);
                    setTimeout(() => {
                        setDiceOutcomeSum(data.diceTotal);

                        if (data.option === data.outcome) {
                            setAmountWon(data.winnings);
                            setOdds(data.Multiplier);
                            setBalance(data.Balance);
                        } else {
                            setAmountWon(data.winnings);
                            setOdds(data.Multiplier);
                            setBalance(data.Balance);
                        }
                    }, 2000);

                    setTimeout(() => {
                        setShowDicePopUp(false);
                        setDiceGameActive(false);
                    }, 2000);

                }, 4000);

            } catch {
                //console.error("Error parsing dice results data:", event.data);
            }
        };
        socket.addEventListener("message", handleSocketMessage);

        return () => {
            socket.removeEventListener("message", handleSocketMessage);
        };
    }, [amountWon, getDiceSocket, showDicePopUp]);

        return (
            <div className="main-dice-container">
                <div className="dice-container">
                    <div className="canvas-dice-container">
                        <div className="dice-top-outcomes">
                            {previousSums.map((sum, index) => (
                                <div key={index} className={`dice-outcomes outcomes-${sum >= 7.5 ? "over" : "under"}`}>
                                    {sum}
                                </div>
                            ))}
                        </div>

                        <div className="game-info-snd">
                            {isSettingsOpen ?
                                (
                                    <img className="game-info-snd-icon" src={closeIcon} alt="game-setting"
                                         onClick={() => setIsSettingsOpen(false)}/>
                                ) : (
                                    <img className="game-info-snd-icon" src={settingsIcon} alt="game-setting"
                                         onClick={() => setIsSettingsOpen(true)}/>
                                )}
                            <img className="dice-logo" src={diceLogo} alt="dice-logo"/>

                            <div className="game-info-right">
                                <span className="bal">Balance</span>
                                <span className="bal-int">{balance || '---'}</span>
                            </div>
                        </div>

                        {isSettingsOpen && (
                            <DiceRollSettingsDialog
                                OnHelpOpen={setIsHelpOpen}
                                isMuted={isMuted}
                                onMuteToggle={setIsMuted}
                                OnSettingsOpen={setIsSettingsOpen}
                            />
                        )}

                        <DiceCanvas
                            diceGameActive={diceGameActive}
                            diceIsSpinning={diceIsSpinning}
                            DiceOutcomeSum={DiceOutcomeSum}
                            diceOutcome={diceOutcome}
                        />

                        <div className="dice-Over-under-container">
                            <ProgressBar progressOverUnder={progressOverUnder}/>
                        </div>

                        {showDicePopUp && (
                            <DicePopUp odds={odds} winnings={Number(amountWon)}/>
                        )}
                    </div>

                    <DiceBetControls
                        diceBetAmount={diceBetAmount}
                        OnChangeBetAmount={setDiceBetAmount}
                        progressOverUnder={progressOverUnder}
                        OnSetGame={HandleDiceStart}
                    />
                    {isHelpOpen && (
                        <DiceRollHowToPlay onClose={() => setIsHelpOpen(false)}/>
                    )}
                </div>
            </div>
        );
    };