import React from 'react'
import { useEffect, useState } from "react";

type CountdownTimerProps = {
    examId: string;
    duration: number;
    onTimeUp: () => void;
    submitted?: boolean;
};


export default function CountdownTimer({
    examId,
    duration,
    onTimeUp,
    submitted = false
}: CountdownTimerProps) {

    const storageKey = `exam-${examId}-end-time`;

    const getEndTime = () => {
        const savedEndTime = localStorage.getItem(storageKey);

        if (savedEndTime) {
            return Number(savedEndTime);
        }

        const newEndTime = Date.now() + duration * 60 * 1000;
        localStorage.setItem(storageKey, JSON.stringify(newEndTime));

        return Number(newEndTime);
    };

    const [endTime] = useState(getEndTime);
    const [timeLeft, setTimeLeft] = useState(
        Math.max(0, endTime - Date.now())
    );

    useEffect(() => {

        if (submitted) {
            return;
        }

        const updateTimer = () => {
            const remaining = Math.max(0, endTime - Date.now());

            setTimeLeft(remaining);

            if (remaining === 0) {
                localStorage.removeItem(storageKey);
                onTimeUp?.();
            }
        };

        updateTimer();

        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [endTime, onTimeUp]);

    const totalSeconds = Math.floor(timeLeft / 1000);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const isAlmostFinished = totalSeconds <= 5 * 60;

    return (
        <div
            className={`font-mono text-xl font-bold ${isAlmostFinished ? "text-red-500" : "text-primary"
                }`}
        >
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
        </div>
    );
}
