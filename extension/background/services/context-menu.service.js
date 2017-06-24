function ContextMenuService() {
    var self = this;
    this.menus = [];
    this.createMenu = function (name, color) {
        chrome.contextMenus.create({
            title: `Mark as ${name}`,
            contexts: ["selection"],
            onclick: function (info, tab) {
                chrome.tabs.sendMessage(tab.id, {id: SelectionMessage.SELECTED, color: color}, function (response) {
                });
            }
        });
    };

    this.show = function () {

        let redMenu = self.createMenu('false', 'red'),
            greenMenu = self.createMenu('trustworthy','green'),
            yellowMenu = self.createMenu('yellow', 'yellow'),
            blueMenu = self.createMenu('blue', 'blue'),
            purpleMenu = self.createMenu('purple', 'purple');

        self.menus = [redMenu, greenMenu, yellowMenu, blueMenu, purpleMenu];
    };

    this.hide = function () {
       if(self.menus.length > 0)
           self.menus.forEach(function (menu) {
               chrome.contextMenus.remove(menu);
           });
    };
}