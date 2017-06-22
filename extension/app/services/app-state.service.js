function AppStateService() {
    StateService.call(this);
}

AppStateService.prototype = Object.create(StateService.prototype);

AppStateService.prototype.handleState = function (state) {
    var self = this;
    Object.keys(state).forEach(function (key) {
        switch (key) {
            case Constant.EXTENSION_ENABLED:
                self.state.extensionEnabled = state[key];
                break;
        }
    });
};

AppStateService.prototype.initState = function () {
    this.state['comments'] = [];
    this.state['currentUser'] = 'Harry';

    chrome.storage.onChanged.addListener(function (changes) {
        for (var key in changes)
            switch (key) {
                case Constant.EXTENSION_ENABLED:
                    var state = {};
                    state[Constant.EXTENSION_ENABLED] = changes[key].newValue;
                    console.log('AppStateService', state);
                    self.set(state);
                    break;

            }
        self.notify();
    });

    var self = this;
    chrome.storage.sync.get(Constant.EXTENSION_ENABLED, function (values) {
        var state = {};
        state[Constant.EXTENSION_ENABLED] = values[Constant.EXTENSION_ENABLED];
        self.set(state);
    });
};
