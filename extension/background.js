(function BackgroundService() {
    function BackgroundStateService() {
        var self = this;

        this.state = {};

        this.subscribers = [];

        this.subscribe = function (subscriber) {
            self.subscribers.push(subscriber);
        };

        this.notify = function () {
            self.subscribers.forEach(function (subscriber) {
                subscriber();
            })
        };

        this.getState = function () {
            return self.state;
        };

        chrome.storage.onChanged.addListener(function (changes) {
            for (var key in changes)
                switch (key) {
                    case Constant.EXTENSION_ENABLED:
                        self.state.extensionEnabled = changes[key].newValue;
                        break;

                }
            self.notify();
        });

        ini

        chrome.storage.sync.get('extension-enabled', function (values) {
            self.extensionEnabled = values['extension-enabled'];
            self.update();
        });
    }

    var self = this;
    this.backgroundStateService = new BackgroundStateService();
    this.contextMenuService = new ContextMenuService();

    this.updateIcon = function (enabled) {
        if (enabled) chrome.browserAction.setIcon({path: 'images/icon128.png'});
        else chrome.browserAction.setIcon({path: 'images/icon128-grey.png'});
    };

    this.subscribe(function () {
        var state = self.backgroundStateService.getState();
        var extensionEnabled = state['extension-enabled'];
        self.contextMenuService.enableContextMenu(extensionEnabled);
        self.updateIcon(extensionEnabled);
    });
})();