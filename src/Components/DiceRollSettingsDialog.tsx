import gameInfor from "../assets/img/help.png";
import gameSndOff from "../assets/img/mute.png";
import gameSndOn from "../assets/img/sound-on.png";
import {Dispatch, FC, SetStateAction} from "react";
import { useEffect, useRef } from "react";

interface MinesSettingsDialogProps {
    OnHelpOpen: Dispatch<SetStateAction<boolean>>;
    isMuted: boolean;
    onMuteToggle: Dispatch<SetStateAction<boolean>>;
    OnSettingsOpen: Dispatch<SetStateAction<boolean>>;

}

export const DiceRollSettingsDialog: FC<MinesSettingsDialogProps> = ({
                                                                      OnHelpOpen,
                                                                      isMuted,
                                                                      onMuteToggle,
                                                                      OnSettingsOpen,
                                                                  }) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dialogRef.current &&
                !dialogRef.current.contains(event.target as Node) &&
                !(event.target as HTMLElement).closest('.game-info-snd-icon')
            ) {
                OnSettingsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [OnSettingsOpen]);

    return (
            <div ref={dialogRef} className="Mines-settings-dialog-overlay">
                <div className="settings-close-container">
                    <div className="dialog-header">Game Settings</div>
                </div>

                <div className="mines-Settings-dialog-controls">
                    <div className="mines-Settings-snd-info-control" onClick={() => onMuteToggle((prev) => !prev)}>
                        <img className="game-info-snd-icon" src={isMuted ? gameSndOff : gameSndOn} alt="game-sound"/>
                        <div className="dialog-content">Sound {isMuted ? "OFF" : "ON"}</div>
                    </div>

                    <div className="mines-Settings-snd-info-control" onClick={() => OnHelpOpen(true)}>
                        <img className="game-info-snd-icon" src={gameInfor} alt="game-info"/>
                        <div className="dialog-content">Help</div>
                    </div>
                </div>
            </div>
    );
};
