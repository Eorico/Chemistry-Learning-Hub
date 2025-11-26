import { FaAtom, FaBolt, FaCircle, FaDotCircle, FaAdjust, FaFlask, FaBalanceScale, FaVial } from "react-icons/fa";
import { useEffect, type JSX } from "react";
import ReactDOM from "react-dom/client";

export default function IconTitle() {
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('.legacyFrame');
    if (!iframe) return;

    const onIframeLoad = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const lessonIcons: Record<string, JSX.Element> = {
        atoms: <FaAtom className="rotating-icon" color="#06edfdff"/>,
        protons: <FaBolt className="rotating-icon" color="#fdf106ff"/>,
        electrons: <FaCircle className="rotating-icon" color="#99bfc2ff"/>,
        neutrons: <FaDotCircle className="rotating-icon" color="#06edfdff"/>,
        charge: <FaAdjust className="rotating-icon" color="#c815e7ff"/>,
        Elements: <FaFlask className="rotating-icon" color="#00ef5cff"/>,
        "balance-equation": <FaBalanceScale className="rotating-icon" color="#e757a6ff"/>,
        molecules: <FaVial className="rotating-icon" color="#a0f04bff"/>,
      };

      const links = doc.querySelectorAll<HTMLElement>('.sidebar ul li a');
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          const lessonId = link.getAttribute('href')?.substring(1);
          const titleEl = doc.getElementById('lessonTitle');
          if (titleEl && lessonId && lessonIcons[lessonId]) {
            const root = ReactDOM.createRoot(titleEl);
            root.render(
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {lessonIcons[lessonId]}
                {link.textContent}
              </span>
            );
          }
        });
      });
    };

    iframe.addEventListener("load", onIframeLoad);

    return () => {
      iframe.removeEventListener("load", onIframeLoad);
    };
  }, []);

  return null;
}
