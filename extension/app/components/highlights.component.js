function HighlightsComponent(dependencies) {
    let self = this;

    this.currentId = 0;
    this.appStateService = dependencies.appStateService;
    this.highlightService = dependencies.highlightService;
    this.highlights = [];

    let DATA_ID_ATTRIBUTE = 'data-weigh-in-id',
        DATA_POSITION_ATTRIBUTE = 'data-weigh-in-position',
        WEIGH_IN_HIGHLIGHTED_NODE = 'weigh-in-highlighted';

    this.assignUniqueIDs = function () {
        let queue = Array.from(dependencies.container.childNodes);
        while (queue.length > 0) {
            let node = queue.shift();
            if (node.nodeType === document.ELEMENT_NODE)
                node.setAttribute(DATA_ID_ATTRIBUTE, `${self.currentId++}`);
            Array.prototype.push.apply(queue, Array.from(node.childNodes));
        }
    };

    this.assignUniqueIDs();
    this.highlightId = this.currentId;

    this.addColorfulBackground = function (id, position, text, start, end, color, parentNode, startContainer) {
        let textBefore = text.substring(0, start);
        let textSelected = text.substring(start, end);
        let textAfter = text.substring(end);

        let textNodeBefore = document.createTextNode(textBefore),
            textNodeAfter = document.createTextNode(textAfter);
        let nodeSelected = document.createElement(WEIGH_IN_HIGHLIGHTED_NODE);
        nodeSelected.textContent = textSelected;
        nodeSelected.setAttribute('class', color);
        nodeSelected.setAttribute(DATA_ID_ATTRIBUTE, `${id}`);
        nodeSelected.setAttribute(DATA_POSITION_ATTRIBUTE, `${position}`);

        parentNode.insertBefore(textNodeAfter, startContainer);
        parentNode.removeChild(startContainer);
        parentNode.insertBefore(nodeSelected, textNodeAfter);
        parentNode.insertBefore(textNodeBefore, nodeSelected);
    };

    this.saveHighlight = function (highlight) {
        let highlightIDsAfterPosition = self.getHighlightIDsAfter(highlight.parentId, highlight.position);
        self.highlightService.addHighlight(highlight, highlightIDsAfterPosition);
    };

    this.getHighlightIDsAfter = function (parentId, position) {
        let siblings = Array.from(document.querySelectorAll(`[${DATA_ID_ATTRIBUTE}='${parentId}'] ${WEIGH_IN_HIGHLIGHTED_NODE}`));
        return siblings.filter(function (sibling) {
            return parseInt(sibling.getAttribute(DATA_POSITION_ATTRIBUTE)) >= position;
        }).map(function (sibling) {
            // sibling.setAttribute(DATA_POSITION_ATTRIBUTE, `${parseInt(sibling.getAttribute(DATA_POSITION_ATTRIBUTE)) + 1}`);
            return parseInt(sibling.getAttribute(DATA_ID_ATTRIBUTE));
        });

        // let highlights = self.appStateService.getState().highlights.filter(function (highlight) {
        //     return highlight.parentId === parentId && highlight.position >= position;
        // }).forEach(function (highlight) {
        //     highlight.position++;
        // });
        //
        // let state = {};
        // state[AppState.HIGHLIGHTS] = highlights;
    };

    this.highlightSelection = function (color) {
        let selection = window.getSelection();
        if (selection.rangeCount > 0) {
            let range = selection.getRangeAt(0);
            if (range.startContainer === range.endContainer) {
                if (range.startContainer.nodeType === document.TEXT_NODE) {
                    let parentNode = range.startContainer.parentNode;
                    if (parentNode.hasAttributes(DATA_ID_ATTRIBUTE)) {
                        let id = ++self.highlightId;
                        let parentId = parseInt(parentNode.getAttribute(DATA_ID_ATTRIBUTE)),
                            previousSibling = range.startContainer.previousSibling;
                        let previousSiblingId = previousSibling ? parseInt(previousSibling.getAttribute(DATA_ID_ATTRIBUTE)) : -1;
                        let position = previousSiblingId === -1 ? 0 : parseInt(previousSibling.getAttribute(DATA_POSITION_ATTRIBUTE)) + 1;
                        self.saveHighlight({
                            id: id,
                            parentId: parentId,
                            previousSiblingId: previousSiblingId,
                            start: range.startOffset,
                            end: range.endOffset,
                            color: color,
                            position: position
                        });
                    }
                }
            }
        }
    };

    this.renderHighlight = function (highlight) {
        let parentNode = document.querySelector(`[${DATA_ID_ATTRIBUTE}='${highlight.parentId}']`),
            previousSibling = highlight.previousSiblingId !== -1 ? document.querySelector(`[${DATA_ID_ATTRIBUTE}='${highlight.previousSiblingId}']`) : null,
            startContainer = previousSibling ? previousSibling.nextSibling : parentNode.childNodes[0];
        self.addColorfulBackground(highlight.id, highlight.position, startContainer.textContent, highlight.start, highlight.end, highlight.color, parentNode, startContainer);
        self.highlightId++;
    };

    this.equals = function (object1, object2) {
      return Object.keys(object1).every(key => object1[key] === object2[key]);
    };

    this.appStateService.subscribe(function () {
        let oldHighlights = {};
        self.highlights.forEach(function (highlight) {
            oldHighlights[highlight.id] = highlight;
        });

        let newHighlights = {};
        self.appStateService.getState().highlights.forEach(function (highlight) {
            newHighlights[highlight.id] = highlight;
        });


        let updatedHighlights = Object.keys(newHighlights).filter(id => id in oldHighlights &&
        !self.equals(newHighlights[id], oldHighlights[id])).map(id => newHighlights[id]);

        let deletedHighlightIDs = Object.keys(oldHighlights).filter(function (oldHighlightID) {
            return !(oldHighlightID in newHighlights);
        });

        let addedHighlights = Object.keys(newHighlights).filter(function (newHighlightId) {
            return !(newHighlightId in oldHighlights);
        }).map(function (addedHighlightID) {
            return newHighlights[addedHighlightID];
        });

        updatedHighlights.forEach(updatedHighlight => {
            let highlightEl = document.querySelector(`[${DATA_ID_ATTRIBUTE}='${updatedHighlight.id}']`);
            highlightEl.setAttribute(DATA_POSITION_ATTRIBUTE, updatedHighlight.position);
        });

        addedHighlights.sort(function (highlight1, highlight2) {
                    return highlight1.position - highlight2.position;
        }).forEach(self.renderHighlight);

        self.highlights = self.appStateService.getState().highlights.map(function (highlight) {
            return highlight;
        });
    });

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        switch (message.id) {
            case SelectionMessage.SELECTED:
                self.highlightSelection(message.color);
                break;
        }
    });
}