// import { useState } from 'react'
import { unlockedBrainly } from "./utils/brainly";
import { unlockedPasseiDireto } from "./utils/passei-direto";

import QRCODE from "./assets/qrcode-pix.png";
import PayPalLOGO from "./assets/paypal.png";
import { useState } from "react";

const unlockedFunctions = {
  "brainly.com.br": unlockedBrainly,
  "www.passeidireto.com": unlockedPasseiDireto,
} as const;

function App() {
  const [showQrCode, setShowQrCode] = useState(false);

  const unlockedSite = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const location = new URL(tab?.url ?? "");

    if (Object.keys(unlockedFunctions).every((key) => key !== location.host)) {
      return chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: () => {
          alert(`Atualmente só funciona nos sites Brainly e Passei Direto`);
        },
      });
    }

    const host = location.host as keyof typeof unlockedFunctions;

    chrome.scripting.insertCSS({
      target: { tabId: tab.id! },
      css: `
      .hidden {
        display: none !important;
      }
      
      .no-blur {
        filter: blur(0px) !important;
      }
      
      .no-limitation {
        overflow: auto !important;
        max-height: initial !important;
      }

      
      .no-limitation ::after {
        display: none !important;
      }
      
      .no-limitation ::before {
        display: none !important;
      }
      `,
    });

    if (unlockedFunctions[host]) {
      const unlocked = unlockedFunctions[host];

      return unlocked(tab.id!);
    }
  };

  return (
    <div className="container">
      <button onClick={unlockedSite}>Desbloquear</button>

      <span
        onClick={() => {
          setShowQrCode(true);
        }}
      >
        Me Apoie! 🌟
      </span>

      {showQrCode && (
        <>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            PIX
            <img
              style={{
                marginTop: "5px",
              }}
              width={150}
              height={150}
              src={QRCODE}
            />
          </span>

          <a
            target="_blank"
            href="https://www.paypal.com/donate/?cmd=_donations&business=rafael30011@gmail.com&currency_code=USD"
          >
            <img src={PayPalLOGO} />
          </a>
        </>
      )}
    </div>
  );
}
export default App;
