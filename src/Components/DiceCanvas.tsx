import diceBg from '../assets/img/dice-bg.png';
import diceMachineOff from '../assets/img/dice-machine-off.png';
import diceMachineOn from '../assets/img/dice-machine-on.png';
import diceUpLight from '../assets/img/dice-up-light.png';
import diceDownLight from '../assets/img/dice-down-light.png';
import diceCenter from '../assets/img/dicecenter.png';
import diceCenter2 from '../assets/img/dice-center.png';
import DiceFace1 from '../assets/img/dicefaces/Dice1.png';
import DiceFace2 from '../assets/img/dicefaces/Dice2.png';
import DiceFace3 from '../assets/img/dicefaces/Dice3.png';
import DiceFace4 from '../assets/img/dicefaces/Dice4.png';
import DiceFace5 from '../assets/img/dicefaces/Dice5.png';
import DiceFace6 from '../assets/img/dicefaces/Dice6.png';
import {FC, useEffect, useRef, useState} from "react";
import usePreloadImages from "../Hooks/useCanvasImages.ts";
import { drawDiceCube3D, finalRotationMapping} from "../Hooks/useDiceCanvasLOgic.ts";

interface DiceCanvasProps {
    diceGameActive: boolean;
    diceIsSpinning: boolean;
    DiceOutcomeSum:number;
    diceOutcome:number[];
}

export const DiceCanvas: FC<DiceCanvasProps> = ({diceGameActive, diceIsSpinning,DiceOutcomeSum,diceOutcome}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [cubeRotation, setCubeRotation] = useState<{ rx: number, ry: number }[]>([
        { rx: 0, ry: 0 },
        { rx: 0, ry: 0 },
        { rx: 0, ry: 0 }
    ]);

    const {images, loaded} = usePreloadImages({
        bg: diceBg,
        machine: diceMachineOff,
        machine2: diceMachineOn,
        light1: diceUpLight,
        light2: diceDownLight,
        centerL: diceCenter,
        center2: diceCenter2,
        Dice1:DiceFace1,
        Dice2:DiceFace2,
        Dice3:DiceFace3,
        Dice4:DiceFace4,
        Dice5:DiceFace5,
        Dice6:DiceFace6,
    });

    useEffect(() => {
        if (!diceIsSpinning) {
            setCubeRotation([{ rx: 0, ry: 0 }, { rx: 0, ry: 0 }, { rx: 0, ry: 0 }]);
            return;
        }
        let animationFrameId: number;
        const animate = () => {
            setCubeRotation(prev =>
                prev.map(r => {
                    // console.log("ry:", r.ry);
                    return { rx:r.rx+ 0.15, ry:r.ry + 0.1};
                })
            );
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [diceIsSpinning]);
    const finalRotations = diceOutcome.map(face => finalRotationMapping[face] || { rx: 0, ry: 0 });

    useEffect(() => {
        if (!loaded) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(images.bg, 0, 0, canvas.width, canvas.height);

        const padding = 20;
        const machineHeight = canvas.height - 2 * padding;
        const aspectRatio = images.machine.width / images.machine.height;
        const machineWidth = machineHeight * aspectRatio-10;
        const x = (canvas.width - machineWidth) / 2 + 20;
        const rectWidth = 316;
        const rectHeight = 500;
        const rectX = (canvas.width - rectWidth) / 2;
        const rectY = (canvas.height - rectHeight) / 2;

        const centerImageWidth = 430;
        const centerImageHeight = 350;
        const centerImageX = (canvas.width - centerImageWidth) / 2 + 20;
        const centerImageY = (canvas.height - centerImageHeight) / 2 - 10;
        const lightHeight = 50;
        const lightWidth = 640;

        //  top lights
        ctx.globalAlpha = 0.5;
        ctx.save();
        ctx.translate(x + lightWidth / 2 - 60, +lightHeight / 2 + 5);
        ctx.rotate((190 * Math.PI) / 0);
        ctx.drawImage(images.light1, -lightWidth / 2, -lightHeight / 2, lightWidth, lightHeight);
        ctx.drawImage(images.light1, -lightWidth / 2, -lightHeight / 2, lightWidth, lightHeight);
        ctx.restore();
        ctx.globalAlpha = 1.0;

        // bottom lights
        ctx.globalAlpha = 0.5;
        ctx.save();
        ctx.translate(x + lightWidth / 2 - 60, machineHeight + 5);
        ctx.rotate((200 * Math.PI) / 0);
        ctx.drawImage(images.light1, -lightWidth / 2, -lightHeight / 2, lightWidth, lightHeight);
        ctx.drawImage(images.light2, -lightWidth / 2, -lightHeight / 2, lightWidth, lightHeight);
        ctx.restore();
        ctx.globalAlpha = 1.0;

        const dicePositions = [
            { x: 150, y: 300 },
            { x: 300, y: 300 },
            { x: 450, y: 300 }
        ];
        const textures = {
            front: images.Dice3,
            right: images.Dice2,
            top: images.Dice1,
            back: images.Dice4,
            left: images.Dice5,
            bottom: images.Dice6,
        };



        const drawCenterElements=()=> {
            const gradient2 = ctx.createLinearGradient(rectX, rectY, rectX, rectY + rectHeight);
            gradient2.addColorStop(0.1, "rgba(0,158,255,0.57)");
            gradient2.addColorStop(0.5, "transparent");
            gradient2.addColorStop(1, "rgb(0,160,255,0.57)");
            ctx.fillStyle = gradient2;

            ctx.fillRect(rectX, rectY, rectWidth / 2 + 200, rectHeight);
            ctx.drawImage(images.center2, centerImageX, centerImageY, centerImageWidth, centerImageHeight);
            const gradient = ctx.createLinearGradient(rectX, rectY, rectX, rectY + rectHeight);
            gradient.addColorStop(0, "#00ff8e");
            gradient.addColorStop(0.48, "#69f1fa");
            gradient.addColorStop(1, "#00c9ff");
            const textValue = DiceOutcomeSum.toString();
            ctx.fillStyle = gradient;
            ctx.font = "bold 98px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText(textValue, rectX + rectWidth / 2 + 25, rectY + rectHeight / 2);
            ctx.drawImage(images.centerL, centerImageX, centerImageY, centerImageWidth, centerImageHeight);
            ctx.drawImage(images.machine, x, padding, machineWidth, machineHeight);
        }

        if (diceGameActive) {
            if (diceIsSpinning) {
                dicePositions.forEach((pos, index) => {
                    const { rx, ry } = cubeRotation[index];
                    drawDiceCube3D(ctx, textures, pos.x + 40, pos.y + 40, rx, ry);
                });
            } else {
                dicePositions.forEach((pos, index) => {
                    const rotation = finalRotations[index];
                    drawDiceCube3D(ctx, textures, pos.x + 40, pos.y + 40, rotation.rx, rotation.ry+0.01);
                });

                const drawPlusSign = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number = 20) => {
                    ctx.strokeStyle = "#f5e0ff";
                    ctx.lineWidth = 4;
                    ctx.beginPath();

                    ctx.moveTo(x, y - size / 2);
                    ctx.lineTo(x, y + size / 2);

                    ctx.moveTo(x - size / 2, y);
                    ctx.lineTo(x + size / 2, y);

                    ctx.stroke();
                };

                const plusPositions = [
                    { x: (dicePositions[0].x + dicePositions[1].x) / 2+40, y: 340 },
                    { x: (dicePositions[1].x + dicePositions[2].x) / 2+40, y: 340 }
                ];

                plusPositions.forEach(pos => drawPlusSign(ctx, pos.x, pos.y));
            }

            ctx.drawImage(images.machine2, x, padding, machineWidth, machineHeight);
        } else {
            if(DiceOutcomeSum  > 0 || DiceOutcomeSum ===0)  drawCenterElements();
            ctx.drawImage(images.machine, x, padding, machineWidth, machineHeight);

        }
    }, [loaded, images, diceGameActive, diceIsSpinning, DiceOutcomeSum, cubeRotation, finalRotations]);

    return <canvas id="diceCanvas" ref={canvasRef} width="650" height="650"></canvas>;
};