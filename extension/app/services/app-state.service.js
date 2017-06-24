function AppStateService() {
    StateService.call(this);
}

AppStateService.prototype = Object.create(StateService.prototype);

AppStateService.prototype.handleState = function (state) {
    let self = this;
    Object.keys(state).forEach(function (key) {
        switch (key) {
            case AppState.EXTENSION_ENABLED:
                self.state.extensionEnabled = state[key];
                break;
            case AppState.COMMENTS:
                self.state.comments = state[key];
                break;
            case AppState.HIGHLIGHTS:
                self.state.highlights = state[key];
                break;
        }
    });
};

AppStateService.prototype.initState = function () {
    this.state['comments'] = [];
    this.state['currentUser'] = 'Harry';
    this.state['highlights'] = [];

    chrome.storage.onChanged.addListener(function (changes) {
        for (let key in changes)
            switch (key) {
                case AppState.EXTENSION_ENABLED:
                    let state = {};
                    state[AppState.EXTENSION_ENABLED] = changes[key].newValue;
                    self.set(state);
                    break;
            }
    });

    let self = this;
    chrome.storage.sync.get(AppState.EXTENSION_ENABLED, function (values) {
        var state = {};
        state[AppState.EXTENSION_ENABLED] = values[AppState.EXTENSION_ENABLED];
        self.set(state);
    });
};
