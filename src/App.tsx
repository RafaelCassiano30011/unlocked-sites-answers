// import { useState } from 'react'
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { PasseiDiretoUnlocked } from "./utils/PasseiDiretoUnlocked";

function App() {
  // const [count, setCount] = useState(0)
  const changeColorOnClick = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const location = new URL(tab?.url ?? "");

    if (location.host !== "brainly.com.br" && location.host !== "passeidireto.com") return;

    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        if (window.location.host === "brainly.com.br") {
          const $unlockedSection = document.querySelector("div[data-testid='unlock_section']");
          const $content = document.querySelector(".AnswerBoxLayout-module__content--bMldb");
          const $falseText = document.querySelector("div[data-testid='answer_box_below_blockade']");

          console.log($content, "$unlockedSection");

          $unlockedSection?.classList.add("hidden");
          $content?.classList.add("no-limitation");
          $falseText?.classList.add("hidden")

          return;
        }

        if (window.location.host === "passeidireto.com") {
          PasseiDiretoUnlocked();

          return;
        }

        alert(`Só funciona nos sites Brainly e Passei Direto ${window.location.host}`);
      },
    });

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
  };
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => changeColorOnClick()}>Change Color</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}
export default App;
