function HighlightsComponent(dependencies) {
    let DATA_ID_ATTRIBUTE = 'data-weigh-in-id';
    let WEIGN_IN_HIGHLIGHTED_NODE = 'weigh-in-highlighted';
    let self = this;
    this.highlights = [{
        parentId: 4,
        previousSiblingId: 121,
        start: 5,
        end: 10
    }];
    this.assignUniqueIDs = function () {
        let queue = Array.from(dependencies.container.childNodes);
        let i = 0;
        while (queue.length > 0) {
            let node = queue.shift();
            if (node.nodeType === document.ELEMENT_NODE)
                node.setAttribute(DATA_ID_ATTRIBUTE, i++);
            Array.prototype.push.apply(queue, Array.from(node.childNodes));
        }
    };

    this.assignUniqueIDs();
    this.highlightSelection = function (color) {
        let selection = window.getSelection();
        if (selection.rangeCount > 0) {
            let range = selection.getRangeAt(0);
            if (range.startContainer === range.endContainer) {
                if (range.startContainer.nodeType === document.TEXT_NODE) {
                    let parentNode = range.startContainer.parentNode;
                    if (parentNode.hasAttributes(DATA_ID_ATTRIBUTE)) {
                        let text = range.startContainer.textContent;
                        let textBefore = text.substring(0, range.startOffset);
                        let textSelected = text.substring(range.startOffset, range.endOffset);
                        let textAfter = text.substring(range.endOffset);

                        let textNodeBefore = document.createTextNode(textBefore),
                            textNodeAfter = document.createTextNode(textAfter);
                        let nodeSelected = document.createElement(WEIGN_IN_HIGHLIGHTED_NODE);
                        nodeSelected.textContent = textSelected;
                        nodeSelected.setAttribute('class', color);

                        console.log(range.startContainer, range.startContainer.previousSibling, range.startContainer.parentNode);

                        parentNode.insertBefore(textNodeAfter, range.startContainer);
                        parentNode.removeChild(range.startContainer);
                        parentNode.insertBefore(nodeSelected, textNodeAfter);
                        parentNode.insertBefore(textNodeBefore, nodeSelected);
                    }
                }
            }
        }
    };

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        switch (message.id) {
            case SelectionMessage.SELECTED:
                self.highlightSelection(message.color);
                break;

        }
    });
}