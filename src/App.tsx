import LegacyCode from "./oldCodes/LegacyCode";
import IconSidebar from "./components/IconSidebar";
import IconTitle from "./components/IconTitle";
import LottieSplash from "./splashScreen/splash";
import { useEffect, useState } from "react";

function App () {
  const [loading, setLoading] = useState(true);
  const [mobile, setMobileRestriction] = useState(false);
  const [splashKey, setSplashKey] = useState(0);  // 👈 used to remount splash

  useEffect(() => {
    const checkMobileView = () => {
      setMobileRestriction(window.innerWidth < 1024);
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  // 🔁 Restart splash forever if mobile
  const handleSplashFinish = () => {
    if (mobile) {
      setSplashKey(prev => prev + 1); // forces splash remount = restart
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Splash for both PC and Mobile */}
      {loading && <LottieSplash key={splashKey} onFinish={handleSplashFinish}/>}

      {/* 🚫 Mobile warning (CSS will control full display) */}
      <div className="mobileWarning">
        <LottieSplash key={splashKey} onFinish={handleSplashFinish}/>
        <p>PLEASE VIEW THIS WEBSITE ON PC DESKTOP FOR FULL VIEW EXPERIENCE</p>
      </div>

      {/* 💻 Normal website content (CSS hides this on mobile) */}
      {!loading && !mobile && (
        <>
          <LegacyCode />  
          <IconSidebar />
          <IconTitle />
          <iframe src="/ChemLabSimulation/html/index.html" className="legacyFrame"/>
        </>
      )}
    </>
  );
}

export default App;
