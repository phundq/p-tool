// let color = '#3aa757';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });

search = (text) => {
  let newURL = "https://www.google.com/search?q=" + text + " site%3Astackoverflow.com";
  chrome.tabs.create({ url: newURL })
}

chrome.contextMenus.create({
  id: "search",
  title: "Search with stackoverflow.com",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == "search") {
    search(info.selectionText);
  }
});

chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {
    switch (message.type) {
      case "setTextSearch":
        search(message.textSearch);
        break;
      default:
        console.error("Unrecognised message: ", message);
    }
  }
);

chrome.commands.onCommand.addListener(function (command) {
  console.log('Command:', command);
});