(function BackgroundService() {
    var self = this;
    this.contextMenuService = new ContextMenuService();

    this.updateIcon = function (enabled) {
        if(enabled) chrome.browserAction.setIcon({path: 'images/icon128.png'});
        else chrome.browserAction.setIcon({path: 'images/icon128-grey.png'});
    };

    this.handleStateChange = function () {
        chrome.storage.onChanged.addListener(function (changes) {
            for (var key in changes)
                switch (key) {
                    case 'weighIn-enabled':
                        self.contextMenuService.enableContextMenu(changes[key].newValue);
                        self.updateIcon(changes[key].newValue);
                        break;

                }
        });
    };
    this.handleStateChange();
})();