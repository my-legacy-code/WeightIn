function Component(metadata) {
    if (!metadata.hasOwnProperty('selector')) return;
    this.el = document.createElement(metadata['selector']);
    var self = this;
    if (!metadata.hasOwnProperty('templateUrl')) return;
    self.template = Handlebars.compile(Request.getSyn(chrome.extension.getURL(metadata['templateUrl'])));
    this.update();
}

Component.prototype.update = function (data) {
    this.el.innerHTML = this.template(data);
    this.bindEventListeners();
};

Component.prototype.bindEventListeners = function () {};
