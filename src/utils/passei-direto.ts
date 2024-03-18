export function unlockedPasseiDireto(id: number) {
  chrome.scripting.executeScript({
    target: { tabId: id },
    func: () => {
      const listFreeBanner = document.querySelectorAll("div[class*='FreeTrialBanner_container']");
      const listBanner = document.querySelectorAll("div[class*='BannerSelector_banner-container']");
      const contents = document.querySelectorAll("div[class*='AnswerCard_answer-content']");
      const imgsBlur = document.querySelectorAll<HTMLImageElement>("img[style='filter: blur(10px);']");
      const divBlur = document.querySelectorAll<HTMLImageElement>("div[style='filter: blur(10px);']");

      listFreeBanner?.forEach((item) => {
        item?.classList.add("hidden");
      });

      [...divBlur, ...imgsBlur]?.forEach((item) => {
        item?.classList.add("no-blur");
      });

      listBanner?.forEach((item) => {
        item?.classList.add("hidden");
      });

      contents?.forEach((item) => {
        const $section = item?.querySelector("section");

        $section?.classList.add("no-blur");
      });
    },
  });
}
