// window.onload = function () {
//     console.log('URL: ', window.location.href);
//     document.body.addEventListener('mousedown', function (e) {
//        console.log('mouse-down', e.x, e.y);
//     });
//     document.body.addEventListener('mouseup', function (e) {
//         console.log('mouse-up', e.x, e.y);
//         var selection = window.getSelection();
//         // maybe it's always 1
//         if (selection.rangeCount) {
//             var range = selection.getRangeAt(0);
//             var length = range.endOffset - range.startOffset;
//             if (length > 0 && range.startContainer === range.endContainer)
//                 console.log(range.getBoundingClientRect());
//         }
//         return null;
//     });
//     showComments();
// };
//
// function showComments() {
//     var sidebar.component.js = document.createElement('div');
//     sidebar.component.js.attributes
// }
//
// function appendId(node) {
//     var queue = [document.body];
//     while(queue) {
//
//     }
// }

window.onload = function () {
    var toggleSwitch = document.querySelector('#switch-toggle');
    isPlugInEnabled(function (enabled) {
            toggleSwitch.checked = enabled;
    });
    toggleSwitch.addEventListener('change', function () {
        if(toggleSwitch.checked)
            enablePlugIn(true);
        else
            enablePlugIn(false);
    })
};

function enablePlugIn(enabled) {
    chrome.storage.sync.set({'weighIn-enabled': enabled});
}

function isPlugInEnabled(processValue) {
    chrome.storage.sync.get('weighIn-enabled', function(values){
        processValue(values['weighIn-enabled']);
    });
}