(function AppComponent() {
    var self = this;

    this.appStateService = new AppStateService();

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
    this.sidebar = new SideBarComponent({appStateService: this.appStateService});
    document.body.appendChild(this.sidebar.el);

    this.messageBox = new MessageBoxComponent();

    this.handleStateChange();

    chrome.storage.sync.get('weighIn-enabled', function(values){
        self.enablePlugIn(values['weighIn-enabled']);
    });
})();