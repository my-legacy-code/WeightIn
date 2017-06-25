function PopupStateService() {
    StateService.call(this);
}

PopupStateService.prototype = Object.create(StateService.prototype);

PopupStateService.prototype.handleState = function (state) {
    var self = this;
    Object.keys(state).forEach(function (key) {
        switch (key) {
            case AppState.EXTENSION_ENABLED:
                self.state.extensionEnabled = state[key];
                var storageState = {};
                storageState[key] = state[key];
                chrome.storage.sync.set(storageState);
                break;
        }
    });
};

PopupStateService.prototype.initState = function () {
    var self = this;
    chrome.storage.sync.get(AppState.EXTENSION_ENABLED, function (values) {
        var state = {};
        state[AppState.EXTENSION_ENABLED] = values[AppState.EXTENSION_ENABLED];
        self.set(state);
    });
};

window.onload = function () {

    var self = this;

    this.popupStateService = new PopupStateService();

    var toggleSwitch = document.querySelector('#switch-toggle');

    toggleSwitch.addEventListener('click', function () {
        var state = {};
        state[AppState.EXTENSION_ENABLED] = toggleSwitch.checked;
        self.popupStateService.set(state);
    });

    this.popupStateService.subscribe(function () {
        toggleSwitch.checked = self.popupStateService.getState().extensionEnabled;
    });

    this.popupStateService.initState();
};