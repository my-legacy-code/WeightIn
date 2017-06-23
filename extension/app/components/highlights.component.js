function HighlightsComponent(dependencies) {
    this.assignUniqueIDs = function () {
        var queue = Array.from(dependencies.container.childNodes);
        var i = 0;
        while (queue.length > 0) {
            var node = queue.shift();
            if (node.nodeType === document.ELEMENT_NODE)
                node.setAttribute('data-weigh-in-id', i++);
            Array.prototype.push.apply(queue, Array.from(node.childNodes));
        }
    };

    this.assignUniqueIDs();
}