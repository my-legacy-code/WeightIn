function HighlightService(dependencies) {
    let self = this;
    this.weignInAPI = new WeignInAPI();
    this.realTimeService = dependencies.realTimeService;
    this.appStateService = dependencies.appStateService;
    this.channelHandlers = {
        connected: function () {
            console.log("connected", this.identifier)

        },
        disconnected: function () {
            console.log("disconnected", this.identifier)
        },
        received: function (data) {
            if (!('message_type' in data))
                return;
            switch (data['message_type']) {
                case 'all_highlights':
                    self.receiveAllHighlights(data['highlights']);
                    break;
                case 'new_highlight':
                    self.receiveNewHighlight(data['highlight']);
                    break;
            }
        }
    };

    this.data = {
        'https://developer.chrome.com/extensions/messaging': [
            {
                color: 'green',
                end: 78,
                id: 2208,
                parentId: 43,
                previousSiblingId: -1,
                start: 7,
                position: 0
            },
            {
                color: 'red',
                end: 74,
                id: 2209,
                parentId: 43,
                previousSiblingId: 2208,
                start: 6,
                position: 1
            }
        ],
        'http://eloquentjavascript.net/01_values.html': [
            {
                id: 579,
                parentId: 4,
                previousSiblingId: 121,
                start: 7,
                end: 48,
                color: 'red',
                position: 0
            },
            {
                id: 580,
                parentId: 4,
                previousSiblingId: 579,
                start: 1,
                end: 19,
                color: 'blue',
                position: 1
            },
            {
                id: 581,
                parentId: 4,
                previousSiblingId: 580,
                start: 1,
                end: 13,
                color: 'purple',
                position: 2
            },
            {
                id: 582,
                parentId: 4,
                previousSiblingId: 581,
                start: 1,
                end: 68,
                color: 'yellow',
                position: 3
            },
            {
                id: 583,
                parentId: 4,
                previousSiblingId: 582,
                start: 1,
                end: 83,
                color: 'green',
                position: 4
            },
            {
                color: "red",
                end: 76,
                id: 584,
                parentId: 5,
                previousSiblingId: 122,
                start: 5,
                position: 0
            }
        ]
    };
    this.highlights = this.data[window.location.href];
}

HighlightService.prototype.start = function () {
    this.receiveAllHighlights(this.data[window.location.href]);
};

HighlightService.prototype.receiveAllHighlights = function (highlights) {
    this.appStateService.set({
        'highlights': highlights
    });
};

HighlightService.prototype.receiveNewHighlight = function (highlight, highlightIDsAfterPosition) {
    let highlights = this.appStateService.getState().highlights.map(function (highlight) {
        return Object.assign({}, highlight);
    });
    highlights = highlights.map(highlight =>
        highlightIDsAfterPosition.indexOf(highlight.id) !== -1 ?
            Object.assign({}, highlight, {position: highlight.position + 1}) :
            highlight);
    highlights.push(highlight);
    let states = {};
    states[AppState.HIGHLIGHTS] = highlights;
    this.appStateService.set(states);
};

HighlightService.prototype.addHighlight = function (highlight, highlightIDsAfterPosition) {
    this.receiveNewHighlight(highlight, highlightIDsAfterPosition);
};