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
        const $safeHtml = item.nextElementSibling?.querySelector("span[data-testid='safe_html']");

        if ($safeHtml && $safeHtml?.textContent === "") {
          const descriptionResponse = document.querySelector("#head-og-description")!;

          $safeHtml.textContent = descriptionResponse!.getAttribute("content");
        }
      });

      listFalseText.forEach((item) => {
        item.classList.add("hidden");
      });
    },
  });
}
