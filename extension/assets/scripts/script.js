function PopupStateService() {
    StateService.call(this);
}

PopupStateService.prototype = Object.create(StateService.prototype);

PopupStateService.prototype.handleState = function (state) {
    var self = this;
    Object.keys(state).forEach(function (key) {
        switch (key) {
            case Constant.EXTENSION_ENABLED:
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
    chrome.storage.sync.get(Constant.EXTENSION_ENABLED, function (values) {
        var state = {};
        state[Constant.EXTENSION_ENABLED] = values[Constant.EXTENSION_ENABLED];
        self.set(state);
    });
};

window.onload = function () {

    var self = this;

    this.popupStateService = new PopupStateService();

    var toggleSwitch = document.querySelector('#switch-toggle');

    toggleSwitch.addEventListener('change', function () {
        var state = {};
        state[Constant.EXTENSION_ENABLED] = toggleSwitch.checked;
        self.popupStateService.set(state);
    });

    this.popupStateService.subscribe(function () {
        toggleSwitch.checked = self.popupStateService.getState().extensionEnabled;
    });

    this.popupStateService.initState();
};