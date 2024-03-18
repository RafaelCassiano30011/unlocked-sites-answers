// import { useState } from 'react'
import "./App.css";
import { unlockedBrainly } from "./utils/brainly";
import { unlockedPasseiDireto } from "./utils/passei-direto";

const unlockedFunctions = {
  "brainly.com.br": unlockedBrainly,
  "www.passeidireto.com": unlockedPasseiDireto,
};

function App() {
  // const [count, setCount] = useState(0)
  const unlockedSite = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const location = new URL(tab?.url ?? "");

    if (location.host !== "brainly.com.br" && location.host !== "www.passeidireto.com") return;

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
      
      .no-limitation::after {
        display: none;
      }
      
      .no-limitation::before {
        display: none;
      }
      `,
    });

    if (unlockedFunctions[location.host]) {
      const unlocked = unlockedFunctions[location.host];

      return unlocked(tab.id!);
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        alert(`Só funciona nos sites Brainly e Passei Direto ${window.location.host}`);
      },
    });
  };
  return <button onClick={unlockedSite}>Desbloquear</button>;
}
export default App;
