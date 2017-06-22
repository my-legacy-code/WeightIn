(function AppComponent() {
    var self = this;

    this.appStateService = new AppStateService();

    this.sidebar = new SideBarComponent({appStateService: this.appStateService});
    document.body.appendChild(this.sidebar.el);

    this.appStateService.subscribe(function () {
        if(self.appStateService.getState().extensionEnabled)
            self.sidebar.show();
        else
            self.sidebar.hide();
    });


    this.commentService = new CommentService();
    this.commentService.getComments(window.location.href).then(function (comments) {
        self.appStateService.getState().comments = comments;
        self.appStateService.notify();
    });

    this.appStateService.initState();
})();