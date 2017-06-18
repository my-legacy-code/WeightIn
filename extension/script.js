function handleRequest(request,sender,sendResponse) {
    if(request.callFunciton == "toggleSidebar")
        toggleSidebar();
}
chrome.extension.onRequest.addListener(handleRequest);

var sidebarElement = document.createElement('div');
var sidebarOpen = false;

sidebarElement.id="WeighInSidebar";
var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
xhr.open('get', 'sidebar.html', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) { 
        document.getElementById("WeighInSidebar").innerHTML = xhr.responseText;
    } 
}
xhr.send();
sidebarElement.style.display = "none";

// window.onload = function () {
//     console.log('URL: ', window.location.href);

//     sidebarElement.id="WeighInSidebar";
//     var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
//     xhr.open('get', 'sidebar.html', true);
//     xhr.onreadystatechange = function() {
//        if (xhr.readyState == 4 && xhr.status == 200) { 
//             document.getElementById("WeighInSidebar").innerHTML = xhr.responseText;
//        } 
//     }
//     xhr.send();
//     sidebarElement.style.display = "none";

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

function toggleSidebar() {
    if(sidebarOpen) {
        sidebarElement.style.display="none";
        document.body.className = document.body.className.replace("weighinpadding","");
        sidebarOpen = false;
    } else {
        sidebarElement.style.display="";
        document.body.classList += "wieghinpadding";
        sidebarOpen = true;
    }
}

function showComments() {
    var sidebar = document.createElement('div');
    sidebar.attributes
}

function appendId(node) {
    var queue = [document.body];
    while(queue) {

    }
}