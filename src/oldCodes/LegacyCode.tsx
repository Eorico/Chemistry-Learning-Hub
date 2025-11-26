import { useEffect } from "react";

export default function LegacyCode () {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/ChemLabSimulation/script/script.js'
        script.defer = true;

        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null;
}