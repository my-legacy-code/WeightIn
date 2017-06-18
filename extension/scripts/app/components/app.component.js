(function AppComponent() {
    var self = this;

    // this.initHighlighter = new initHighlighter();

    this.enablePlugIn = function (enabled) {
        if (enabled) self.sidebar.show();
        else self.sidebar.hide();
    };

    this.handleStateChange = function () {
        chrome.storage.onChanged.addListener(function (changes) {
            for (var key in changes)
                switch (key) {
                    case 'weighIn-enabled':
                        self.enablePlugIn(changes[key].newValue);
                        break;

                }
        });
    };
    this.sidebar = new SideBarComponent();
    document.body.appendChild(this.sidebar.el);

    this.messageBox = new MessageBoxComponent();

    this.comments = [{
            id:1,username:'3NYTimes',dateAdded:new Date(2017,6,7,10,34),
            comment:'Great article, checkout this other article by Maurine Dowd: https://www.nytimes.com/2017/05/27/opinion/sunday/trumps-hand-to-hand-combat.html'
        }, {
            id:2,username:'Feminist123', dateAdded:new Date(2017,6,7,10,37),
            comment:'This article only skims the surface of issues sur-rounding sexism in the United States.'
        }, {
            id:3,username:'3NYTimes',dateAdded:new Date(2017,6,18,9,30),
            comment: 'Cool'
        }];

    this.comments = [{}];
    this.handleStateChange();
})();