import { FaAtom, FaBolt, FaCircle, FaDotCircle, FaAdjust, FaFlask, FaBalanceScale, FaVial } from "react-icons/fa";
import { useEffect } from "react";
import ReactDOM from "react-dom/client";

export default function IconSidebar() {
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('.legacyFrame');

    if (!iframe) return;

    const onIframeLoad = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const iconElements = doc.querySelectorAll<HTMLElement>('.icons');

      const ReactIcons = [
        <FaAtom />,
        <FaBolt />,
        <FaCircle />,
        <FaDotCircle />,
        <FaAdjust />,
        <FaFlask />,
        <FaBalanceScale />,
        <FaVial />
      ];

      iconElements.forEach((el, i) => {
        const root = ReactDOM.createRoot(el);
        root.render(ReactIcons[i]);
        (el as any)._reactRoot = root;
      });
    };

    iframe.addEventListener("load", onIframeLoad);

    return () => {
      iframe.removeEventListener("load", onIframeLoad);
    };
  }, []);

  return null;
}
