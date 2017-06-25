function AppComponent() {
    let self = this;

    this.appStateService = new AppStateService();
    this.appStateService.subscribe(function () {
        if (self.appStateService.getState().extensionEnabled) {
            self.sidebar.show();
        } else {
            self.sidebar.hide();
        }
    });

    this.appStateService.initState();
    this.realTimeService = new RealTimeService();
    this.commentService = new CommentService({
        realTimeService: this.realTimeService,
        appStateService: this.appStateService
    });

    this.highlightService = new HighlightService({
        realTimeService: this.realTimeService,
        appStateService: this.appStateService
    });

    this.highlights = new HighlightsComponent({
        appStateService: this.appStateService,
        highlightService: this.highlightService,
        container: document.body
    });

    this.sidebar = new SideBarComponent({appStateService: this.appStateService, commentService: this.commentService});
    document.body.appendChild(this.sidebar.el);

    this.commentService.start();
    this.highlightService.start();
}

(function bootstrap() {
    let stateChecker =  window.setTimeout(function checkState() {
        if(document.readyState === 'complete') {
            new AppComponent();
            window.clearInterval(stateChecker);
        } else stateChecker = window.setTimeout(checkState, 500);
    }, 500);
})();