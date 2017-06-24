(function Daemon() {
    var self = this;
    this.contextMenuService = new ContextMenuService();
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        switch (message.id) {
            case RequestMessage.GET:
                Request.get(message.request.url, message.request.queryParams).then(sendResponse);
                break;
            case RequestMessage.POST:
                Request.post(message.request.url, message.request.queryParams, message.request.data, message.request.headers).then(sendResponse);
                break;
        }
    });

    this.enabledExtension = function (enabled) {

        if (enabled) {
            self.contextMenuService.show();
            chrome.browserAction.setIcon({path: 'assets/images/icon128.png'});
        } else {
            self.contextMenuService.hide();
            chrome.browserAction.setIcon({path: 'assets/images/icon128-grey.png'});
        }
    };

    chrome.storage.onChanged.addListener(function (changes) {
        for (var key in changes)
            switch (key) {
                case AppState.EXTENSION_ENABLED:
                    self.enabledExtension(changes[key].newValue);
                    break;

            }
    });

    chrome.storage.sync.get(AppState.EXTENSION_ENABLED, function (values) {
        self.enabledExtension(values[AppState.EXTENSION_ENABLED]);
    });
})();

