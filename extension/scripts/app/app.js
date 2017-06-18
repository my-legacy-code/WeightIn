function App() {
    this.comments = [{}];

    this.handle_state();
}

App.prototype.handle_state = function () {
    chrome.storage.onChanged.addListener(function (changes) {
        for (var key in changes)
            if (changes.hasOwnProperty(key))
                switch (key) {
                    case 'weighIn-enabled':
                        // this.enablePlugIn(changes[key]);
                }
    });
};

// App.prototype.enablePlugIn = function(enabled) {
//   console.log(enabled);
// };


var app = new App();