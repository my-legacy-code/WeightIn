function ContextMenuService() {
    var self = this;
    this.show = function () {
        self.menu  = chrome.contextMenus.create({
            title: "Add new message to %s",
            contexts: ["selection"],
            onclick: function () {
                alert("CLick");
            }
        }, function () {
            // chrome.storage.sync.set({'weighIn-enabled': enabled});
        });
    };

    this.hide = function () {
        if(self.menu)
            chrome.contextMenus.remove(self.menu);
    };

    this.enableContextMenu = function(enabled){
        if(enabled) self.show();
        else self.hide();
    };
}