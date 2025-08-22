import {useCallback, useEffect, useMemo} from "react";
import RollSndSrc from "../DiceAudio/rolling.mp3";
import WinSndSrc from "../DiceAudio/win.mp3";
import LoseSndSrc from "../DiceAudio/lose.mp3";
import DiceBackgroundSound from "../DiceAudio/background.mp3";

export const useDiceAudioControl = (isMuted: boolean, loop: boolean) => {
    const DiceAudioInstances = useMemo(() => {
        return {
            RollSnd: new Audio(RollSndSrc),
            WinSnd: new Audio(WinSndSrc),
            LoseSnd: new Audio(LoseSndSrc),
        };
    }, []);

    const diceBackgroundSound = useMemo(() => {
        const bgSound = new Audio(DiceBackgroundSound);
        bgSound.loop = loop;
        bgSound.volume = 0.4;
        return bgSound;
    }, [loop]);

    useEffect(() => {
        if (!isMuted) {
            diceBackgroundSound.play().catch((err) => {
                if (err.name === 'NotAllowedError') {
                    console.warn('User interaction required for audio playback.');
                } else {
                    // console.error('Audio playback error:', err);
                }
            });
        }

        return () => {
            diceBackgroundSound.pause();
            diceBackgroundSound.currentTime = 0;
        };
    }, [diceBackgroundSound, isMuted]);

    const playDiceLoop = useCallback(() => {
        if (isMuted) return;

        const shuffleSound = DiceAudioInstances.RollSnd;
        shuffleSound.currentTime = 0;
        // shuffleSound.volume= 10;
        shuffleSound.play();

        const interval = setInterval(() => {
            shuffleSound.currentTime = 0;
            shuffleSound.play();
        }, shuffleSound.duration * 1000);

        setTimeout(() => {
            clearInterval(interval);
            shuffleSound.pause();
            shuffleSound.currentTime = 0;
        }, 4500);
    }, [DiceAudioInstances.RollSnd, isMuted]);

    const playDiceSound = useCallback(
        (soundKey: keyof typeof DiceAudioInstances) => {
            if (isMuted) return;

            const sound = DiceAudioInstances[soundKey];
            if (!sound.paused) {
                sound.pause();
                sound.currentTime = 0;
            }
            sound.play().catch((err) => {
                if (err.name === 'NotAllowedError') {
                    // console.warn('User interaction required for audio playback.');
                } else {
                    // console.error('Audio playback error:', err);
                }
            });
        },
        [DiceAudioInstances, isMuted]
    );
    return {playDiceSound,playDiceLoop};
};