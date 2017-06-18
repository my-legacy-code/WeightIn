/*Handle requests from background.html*/
function handleRequest(request, sender, sendResponse) {
	if (request.callFunction == "toggleSidebar")
		toggleSidebar();
}
chrome.extension.onRequest.addListener(handleRequest);

/*Small function wich create a sidebar(just to illustrate my point)*/
var sidebarElement = document.createElement('div');
var sidebarOpen = false;
// sidebarElement.style.cssText = "\
// 			position:fixed;\
// 			top:0px;\
// 			left:0px;\
// 			width:200px;\
// 			height:100%;\
// 			background:white;\
// 			box-shadow:inset 0 0 1em black;\
// 			z-index:999999;\
// 		";

sidebarElement.id="WeighInSidebar";
sidebarElement.innerHTML = "<h2>HELLOWORLD</h2>";
// var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
// xhr.open('get', 'sidebar.html', true);
// xhr.onreadystatechange = function() {
//     if (xhr.readyState == 4 && xhr.status == 200) { 
//         document.getElementById("WeighInSidebar").innerHTML = xhr.responseText;
//     } 
// }
// xhr.send();
sidebarElement.style.display = "none";

document.body.appendChild(sidebarElement);

function toggleSidebar() {
	if(sidebarOpen) {
		console.log(sidebarElement);
		sidebarElement.style.display="none";
		document.body.style="padding-left:0px";
		sidebarOpen = false;
	} else {
		sidebarElement.style.display="";
		document.body.style="padding-left:200px";
		sidebarOpen = true;
	}

	return sidebarOpen;
}