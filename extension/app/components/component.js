function Component(metadata) {
    if (!metadata.hasOwnProperty('selector')) return;
    this.el = document.createElement(metadata['selector']);
    var self = this;
    if (!metadata.hasOwnProperty('template')) return;
    self.template = Handlebars.compile(metadata['template']);
    this.update();
}

Component.prototype.update = function (data) {
    this.el.innerHTML = this.template(data);
    this.bindEventListeners();
};

Component.prototype.bindEventListeners = function () {};
