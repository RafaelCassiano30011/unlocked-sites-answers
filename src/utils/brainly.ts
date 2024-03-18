export function unlockedBrainly(id: number) {
  chrome.scripting.executeScript({
    target: { tabId: id },
    func: () => {
      const $unlockedSection = document.querySelector("div[data-testid='unlock_section']");
      const $unlockedSectionLogin = document.querySelector("div[data-testid='answer_blockade_adapter']");
      const contents = document.querySelectorAll("div[data-testid='answer_box_options_list']");
      const listFalseText = document.querySelectorAll("div[data-testid='answer_box_below_blockade']");

      $unlockedSection?.classList.add("hidden");
      $unlockedSectionLogin?.classList.add("hidden");

      contents.forEach((item) => {
        item.nextElementSibling?.classList.add("no-limitation");
      });

      listFalseText.forEach((item) => {
        item.classList.add("hidden");
      });
    },
  });
}
