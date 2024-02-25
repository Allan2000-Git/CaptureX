console.log("Content Script");

var recorder = null;
var count=1;
function onAccessApproved(stream) {
    recorder = new MediaRecorder(stream);

    recorder.start();

    recorder.onstop = function() {
        stream.getTracks().forEach((track) => {
            if(track.readuState === "live"){
                track.stop();
            }
        })
    }

    recorder.ondataavailable = function(event) {
        let recordData = event.data;
        let url = URL.createObjectURL(recordData);
        let a = document.createElement("a");
        a.href = url;
        a.style.display = "none";
        a.download = `screen-recording-${count}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    count++;
}

// Fired when a message is sent from either an extension process (by runtime.sendMessage) or a content script (by tabs.sendMessage).
// Source: https://developer.chrome.com/docs/extensions/reference/api/runtime#event-onMessage

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'start_recording') {
        console.log("start_recording");

        sendResponse(`Request Granted: ${message.action}`)

        navigator.mediaDevices
        .getDisplayMedia({
            audio: true,
            video: { width: 9999999999, height: 9999999999 },
        })
        .then((mediaStream) => {
            onAccessApproved(mediaStream);
        })
        .catch((err) => {
            console.error(`${err.name}: ${err.message}`);
        });
    }

    if(message.action === "stop_recording"){
        console.log("start_recording");

        sendResponse(`Request Granted: ${message.action}`);

        if(!recorder){
            console.log("You did not start recording your screen");
            return;
        }

        recorder.stop();
    }
});