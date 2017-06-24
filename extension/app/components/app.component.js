function AppComponent() {
    var self = this;

    this.appStateService = new AppStateService();
    this.appStateService.subscribe(function () {
        if (self.appStateService.getState().extensionEnabled) {
            self.sidebar.show();
        } else {
            self.sidebar.hide();
        }
    });

    this.appStateService.initState();
    this.commentService = new CommentService({
        receiveAllComments: function (comments) {
            self.appStateService.set({
                'comments': comments
            })
        },
        receiveNewComment: function (comment) {
            self.appStateService.addComment(comment);
        }
    });


    this.highlightsComponent = new HighlightsComponent({container: document.body});

    this.sidebar = new SideBarComponent({appStateService: this.appStateService, commentService: this.commentService});
    document.body.appendChild(this.sidebar.el);
    this.commentService.start();
}

(function bootstrap() {
    var stateChecker =  window.setTimeout(function checkState() {
        if(document.readyState === 'complete') {
            AppComponent();
            window.clearInterval(stateChecker);
        } else stateChecker = window.setTimeout(checkState, 500);
    }, 500);
})();