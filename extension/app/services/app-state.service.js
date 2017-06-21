function AppStateService() {
    var self = this;
    this.state = {
        comments: [{
            id:1,username:'3NYTimes',dateAdded:new Date(2017,6,7,10,34),
            comment:'Great article, checkout this other article by Maurine Dowd: https://www.nytimes.com/2017/05/27/opinion/sunday/trumps-hand-to-hand-combat.html'
        }, {
            id:2,username:'Feminist123', dateAdded:new Date(2017,6,7,10,37),
            comment:'This article only skims the surface of issues sur-rounding sexism in the United States.'
        }, {
            id:3,username:'3NYTimes',dateAdded:new Date(2017,6,18,9,30),
            comment: 'Cool'
        }]
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