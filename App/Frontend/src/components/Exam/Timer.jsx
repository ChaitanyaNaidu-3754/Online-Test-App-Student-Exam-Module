import { useEffect, useState } from 'react';

const Timer = ({ duration, onTimeout }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeout()
            return
        }

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1)
        }, 1000)

        return () => clearInterval(timerId);
    }, [timeLeft, onTimeout])

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    return (
        <div className="timer">
            Time Left: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
    )
}

export default Timer