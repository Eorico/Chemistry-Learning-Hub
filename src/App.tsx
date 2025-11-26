import LegacyCode from "./oldCodes/LegacyCode";
import IconSidebar from "./components/IconSidebar";
import IconTitle from "./components/IconTitle";
import LottieSplash from "./splashScreen/splash";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [mobile, setMobileRestriction] = useState(false);

  useEffect(() => {
    const checkMobileView = () => setMobileRestriction(window.innerWidth < 1024);
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  return (
    <>
      {mobile && (
        <div className="mobileWarning">
          <LottieSplash onFinish={() => {}} />
          <p>PLEASE VIEW THIS WEBSITE ON PC DESKTOP FOR FULL VIEW EXPERIENCE</p>
        </div>
      )}

      <div className="app-content">
        {loading && !mobile && <LottieSplash onFinish={() => setLoading(false)} />}
        
        {!loading && !mobile && (
          <>
            <LegacyCode />
            <IconSidebar />
            <IconTitle />
            <iframe
              src="/ChemLabSimulation/html/index.html"
              className="legacyFrame"
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
