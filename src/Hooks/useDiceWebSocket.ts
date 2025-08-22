import {useCallback, useRef} from 'react';
import {DiceSendData} from "../Utils/types.ts";

export const useDiceWebSocket = () => {
    const DiceMessageQueue = useRef<(DiceSendData )[]>([]);
    const wsDice = useRef<WebSocket | null>(null);

    const DiceConnectSocket = useCallback(() => {
        if (wsDice.current && wsDice.current.readyState !== WebSocket.CLOSED) {
            // console.log('WebSocket connected');
            return;
        }

        wsDice.current = new WebSocket('wss://lottomotto.co.ke/ws13');
        wsDice.current.onopen = () => {
            processMessageQueue();
        };

        const processMessageQueue = () => {
            while (DiceMessageQueue.current.length > 0) {
                const data = DiceMessageQueue.current.shift();
                if (data) {
                    sendDiceData(data);
                }
            }
        };

        wsDice.current.onmessage = (event: MessageEvent<string>) => {
            // console.log('Received a raw message event:', event);

            if (event && event.data) {
                // console.log('Raw message data:', event.data);

            } else {
                // console.error('Event or event.data is null');
            }
        };

        wsDice.current.onerror = () => {
            // console.error('WebSocket error observed:', e);
        };

        wsDice.current.onclose = () => {
            // console.log('WebSocket connection closed');
        };
    }, []);

    const sendDiceData = (data: DiceSendData) => {
        const message = JSON.stringify(data);

        if (wsDice.current) {
            // console.log("WebSocket state:", wsDice.current.readyState);
        }

        if (wsDice.current && wsDice.current.readyState === WebSocket.OPEN) {
            wsDice.current.send(message);
            // console.log('Message sent:', message);
        } else {
            DiceMessageQueue.current.push(data);
            console.error('WebSocket is not open. Message queued.');
        }
    };

    const getDiceSocket = () => wsDice.current;

    return {
        DiceConnectSocket,
        sendDiceData,
        getDiceSocket,
    };
};
