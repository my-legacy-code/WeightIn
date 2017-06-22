function AppStateService() {
    StateService.call(this);
}

AppStateService.prototype = Object.create(StateService.prototype);

AppStateService.prototype.handleState = function (state) {
    var self = this;
    Object.keys(state).forEach(function (key) {
        switch (key) {
            case AppState.EXTENSION_ENABLED:
                self.state.extensionEnabled = state[key];
                break;
            case AppState.COMMENTS:
                self.state.comments = state[key];
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
                case AppStateService.states.EXTENSION_ENABLED:
                    var state = {};
                    state[AppState.EXTENSION_ENABLED] = changes[key].newValue;
                    console.log('AppStateService', state);
                    self.set(state);
                    break;

            }
        self.notify();
    });

    var self = this;
    chrome.storage.sync.get(AppState.EXTENSION_ENABLED, function (values) {
        var state = {};
        state[AppState.EXTENSION_ENABLED] = values[AppState.EXTENSION_ENABLED];
        self.set(state);
    });
};
