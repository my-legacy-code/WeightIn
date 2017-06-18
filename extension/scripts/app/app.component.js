(function AppComponent() {
    var self = this;

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

    this.comments = [{}];

    this.handleStateChange();
    chrome.storage.sync.get('weighIn-enabled', function(values){
        if(values['weighIn-enabled'])
            self.sidebar.show();
        else self.sidebar.hide();
    });
})();