// executed once the page loads completely
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
    if (changeInfo.status === "complete") {
        console.log(`Tab: ${tabId} URL changed to ${tabInfo.url}`);
        
        chrome.scripting.executeScript({
            target: {tabId},
            files: ["./content.js"]
        })
        .then(() => console.log("Injected content script"))
        .catch((err) => console.log(err.message));
    }
})

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message === 'get-user-data') {
//         sendResponse(user);
//     }
// });