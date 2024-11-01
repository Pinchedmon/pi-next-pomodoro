import React, { useState, useEffect, useRef } from 'react';
import s from './pointer.module.scss';

interface Props {
    isRunning: boolean;
    handleToggle: () => void;
}

const CricketAnimationButton = (props: Props) => {
    const cricketRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (props.isRunning) {
            const intervalId = setInterval(() => {
                cricketRefs.current.forEach((cricket) => {
                    if (cricket) {
                        // Получаем размеры кнопки
                        const button = cricket.parentElement;
                        const buttonRect = button?.getBoundingClientRect();

                        // Генерируем случайные координаты внутри кнопки
                        const randomX = Math.random() * (buttonRect?.width || 0);
                        const randomY = Math.random() * (buttonRect?.height || 0);

                        // Устанавливаем новые координаты для сверчка
                        cricket.style.transform = `translate(${randomX}px, ${randomY}px)`;
                    }
                });
            }, 500); // Обновление каждые 500ms

            return () => clearInterval(intervalId); // Очистка интервала
        }
    }, [props.isRunning]);

    return (
        <button
            className="text-white box-border h-12 w-full font-bold bg-white/10 rounded-xl border-4 border-transparent hover:border-white/20 relative overflow-hidden"
            onClick={props.handleToggle}
        >
            {props.isRunning ? "Стоп" : "Старт"}

        </button>
    );
};

export default CricketAnimationButton;