window.onload = function () {
    var toggleSwitch = document.querySelector('#switch-toggle');

    isPlugInEnabled(function (enabled) {
            toggleSwitch.checked = enabled;
        enablePlugIn(enabled);

    });
    toggleSwitch.addEventListener('change', function () {
        if(toggleSwitch.checked)
            enablePlugIn(true);
        else
            enablePlugIn(false);
    })
};

function enablePlugIn(enabled) {
    if(enabled) chrome.browserAction.setIcon({path: 'images/icon128.png'});
    else chrome.browserAction.setIcon({path: 'images/icon128-grey.png'});
    chrome.storage.sync.set({'weighIn-enabled': enabled});
}

function isPlugInEnabled(processValue) {
    chrome.storage.sync.get('weighIn-enabled', function(values){
        processValue(values['weighIn-enabled']);
    });
}