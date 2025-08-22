import './App.css'
import {MainDice} from "./Components/MainDice.tsx";
import {useEffect, useState} from "react";
import gtLogo from "./assets/img/greatech_logo.png";
import DicePoster from "./assets/img/DiceRollPostermain.png";
function App() {
    const [DiceProgress, setDiceProgress] = useState<number>(0);
    const [DiceLoading, setDiceLoading] = useState<boolean>(true);

    useEffect(() => {
        const minesImageModules = import.meta.glob('./assets/img/*.png', {eager: true, import: 'default'});

        const minesAssets = Object.values(minesImageModules) as string[];
        let loadedAssets = 0;

        const loadMinesAssets = (src: string) => {
            return new Promise<void>((resolve) => {
                const mineImage = new Image();
                mineImage.src = src;
                mineImage.onload = () => {
                    loadedAssets++;
                    setDiceProgress(Math.floor((loadedAssets / minesAssets.length) * 100));
                    resolve();
                };
            })
        };

        Promise.all(minesAssets.map(loadMinesAssets)).then(() => {
            setTimeout(() => {
                setDiceLoading(false);
            }, 2000);
        });
    }, []);
    return (
        <>
            {DiceLoading ?(
                <div className="loading-screen">
                    <img src={DicePoster} alt="dice-poster" className="dice-poster"/>
                    <div className="loading-container">
                        <img src={gtLogo} alt="Logo" className="gt-logo"/>
                        <div className="progress-bar">
                            <div className="progress-content" style={{width: `${DiceProgress}%`}}></div>
                        </div>
                        <p>Loading... {Math.round(DiceProgress)}</p>
                    </div>
                </div>
            ):(
                <MainDice/>
            )}

        </>
    );
}

export default App
