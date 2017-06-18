function initHighlighter() {
	this.body = document.getElementsByTagName("*");
	for (var i=0, max=this.body.length; i < max; i++) {
	     this.body[i].setAttribute("Data-Weigh-In-Id", i);
	}
}