import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import AtomLoad from '../assets/AtomLoad.json';

interface Props {
    onFinish: () => void;
}
const LottieSplash: React.FC<Props> = ({ onFinish }) => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 3000);
        const finishTimer = setTimeout(() => onFinish(), 3500);
        return () => {clearTimeout(timer), clearTimeout(finishTimer)}
    }, [onFinish]);

    return (
        <div className={`lottieSplash ${ visible ? "fadeIn" : "fadeOut" }`}>
            <Lottie 
                animationData={AtomLoad}
                loop={true}
                style={{ width: 300, height: 300 }}
            />
            <p>Loading...</p>
        </div>
    );
}

export default LottieSplash;