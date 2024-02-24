document.addEventListener("DOMContentLoaded", () => {
    const startVideo = document.querySelector("#start_video");
    const stopVideo = document.querySelector("#stop_video");

    // get the current and start recording the current tab
    startVideo.addEventListener("click", () => {
        let queryOptions = { active: true, lastFocusedWindow: true };
        chrome.tabs.query(queryOptions, ([tab]) => {
            chrome.tabs.sendMessage(tab.id, {action: "request_recording"}, (response) => {
                if(!chrome.runtime.lastError){
                    console.log(response);
                }else{
                    console.log("Error");
                }
            })
        })
    })
})