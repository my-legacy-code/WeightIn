function StateService() {
    this.state = {};
    this.subscribers = [];
}

StateService.prototype.subscribe = function (subscriber) {
    this.subscribers.push(subscriber);
};

StateService.prototype.notify = function () {
    this.subscribers.forEach(function (subscriber) {
        subscriber();
    })
};

StateService.prototype.getState = function () {
    return this.state;
};

StateService.prototype.set = function (state) {
    this.handleState(state);
    this.notify();
};

StateService.prototype.handleState = function (state) {};

StateService.prototype.initState = function () {};