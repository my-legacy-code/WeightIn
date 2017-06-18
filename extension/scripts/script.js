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
    });

};

function enablePlugIn(enabled) {
    chrome.storage.sync.set({'weighIn-enabled': enabled});
}

function isPlugInEnabled(processValue) {
    chrome.storage.sync.get('weighIn-enabled', function(values){
        processValue(values['weighIn-enabled']);
    });
}