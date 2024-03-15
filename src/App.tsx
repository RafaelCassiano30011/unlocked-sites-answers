// import { useState } from 'react'
import "./App.css";

function App() {
  // const [count, setCount] = useState(0)
  const unlockedSite = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const location = new URL(tab?.url ?? "");

    if (location.host !== "brainly.com.br" && location.host !== "www.passeidireto.com") return;

    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        if (window.location.host === "brainly.com.br") {
          const $unlockedSection = document.querySelector("div[data-testid='unlock_section']");
          const $unlockedSectionLogin = document.querySelector("div[data-testid='answer_blockade_adapter']");
          const $content = document.querySelector("div[data-testid='answer_box_options_list']")?.nextElementSibling;
          const $falseText = document.querySelector("div[data-testid='answer_box_below_blockade']");

          $unlockedSection?.classList.add("hidden");
          $unlockedSectionLogin?.classList.add("hidden");
          $content?.classList.add("no-limitation");
          $falseText?.classList.add("hidden");

          return;
        }

        if (window.location.host === "www.passeidireto.com") {
          const $listFreeBanner = document.querySelectorAll("div[class*='FreeTrialBanner_container']");
          const $listBanner = document.querySelectorAll("div[class*='BannerSelector_banner-container']");
          const $contents = document.querySelectorAll("div[class*='AnswerCard_answer-content']");
          const $imgsBlur = document.querySelectorAll<HTMLImageElement>("img[style='filter: blur(10px);']");

          $listFreeBanner.forEach((item) => {
            item.classList.add("hidden");
          });

          $imgsBlur.forEach((item) => {
            item.classList.add("no-blur");
          });

          $listBanner.forEach((item) => {
            item.classList.add("hidden");
          });

          $contents.forEach((item) => {
            const $section = item.querySelector("section");

            $section?.classList.add("no-blur");
          });

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
  return <button onClick={unlockedSite}>Desbloquear</button>;
}
export default App;
