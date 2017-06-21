function AppStateService() {
    var self = this;
    this.state = {
        comments: [],
        currentUser: null
    };
    this.subscribers = [];
    this.update = function () {
        self.subscribers.forEach(function (subscriber) { subscriber() })
    };
    this.subscribe = function (subscriber) {
      this.subscribers.push(subscriber);
    };
    this.getState = function () {
        return self.state;
    }
}