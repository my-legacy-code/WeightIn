function HighlightsComponent(dependencies) {
    let self = this;

    this.currentId = 0;

    let DATA_ID_ATTRIBUTE = 'data-weigh-in-id',
        DATA_POSITION_ATTRIBUTE = 'data-weigh-in-position',
        WEIGH_IN_HIGHLIGHTED_NODE = 'weigh-in-highlighted';

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
    if(!this.highlights) this.highlights = [];
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
        self.incrementPositionsAfter(highlight.parentId, highlight.position);
        this.highlights.push(highlight);
    };

    this.incrementPositionsAfter = function (parentId, position) {
        self.highlights.filter(function (highlight) {
            return highlight.parentId === parentId && highlight.position >= position;
        }).forEach(function (highlight) {
            highlight.position++;
        });

        let siblings = Array.from(document.querySelectorAll(`[${DATA_ID_ATTRIBUTE}='${parentId}'] ${WEIGH_IN_HIGHLIGHTED_NODE}`));
        siblings.filter(function (sibling) {
            return parseInt(sibling.getAttribute(DATA_POSITION_ATTRIBUTE)) >= position;
        }).forEach(function (sibling) {
            sibling.setAttribute(DATA_POSITION_ATTRIBUTE, `${parseInt(sibling.getAttribute(DATA_POSITION_ATTRIBUTE)) + 1}`);
        })
    };

    this.highlightSelection = function (color) {
        let selection = window.getSelection();
        if (selection.rangeCount > 0) {
            let range = selection.getRangeAt(0);
            if (range.startContainer === range.endContainer) {
                if (range.startContainer.nodeType === document.TEXT_NODE) {
                    let parentNode = range.startContainer.parentNode;
                    if (parentNode.hasAttributes(DATA_ID_ATTRIBUTE)) {
                        let id = ++self.currentId;
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

                        self.addColorfulBackground(
                            id,
                            position,
                            range.startContainer.textContent,
                            range.startOffset,
                            range.endOffset,
                            color,
                            parentNode,
                            range.startContainer
                        );
                    }
                }
            }
        }
    };

    this.renderHighlight = function (highlight) {
        let parentNode = document.querySelector(`[${DATA_ID_ATTRIBUTE}='${highlight.parentId}']`),
            previousSibling = highlight.previousSiblingId !== -1 ? document.querySelector(`[${DATA_ID_ATTRIBUTE}='${highlight.previousSiblingId}']`) : null,
            startContainer = previousSibling ? previousSibling.nextSibling : parentNode.childNodes[0];

        console.log(parentNode, previousSibling, startContainer);

        self.addColorfulBackground(highlight.id, highlight.position, startContainer.textContent, highlight.start, highlight.end, highlight.color, parentNode, startContainer);
        self.currentId++;
    };

    console.log(this.currentId);

    if (this.highlights) {
        this.highlights.sort(function (highlight1, highlight2) {
            return highlight1.position - highlight2.position;
        }).forEach(this.renderHighlight);
    }

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        switch (message.id) {
            case SelectionMessage.SELECTED:
                self.highlightSelection(message.color);
                break;

        }
    });
}