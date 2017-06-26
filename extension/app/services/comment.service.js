function CommentService(dependencies) {
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
                case 'all_comments':
                    console.log(data['comments']);
                    self.receiveAllComments(data['comments']);
                    break;
                case 'new_comment':
                    self.receiveNewComment(data['comment']);
                    break;
            }
        }
    };
}

CommentService.prototype.receiveAllComments = function (comments) {
    this.appStateService.set({
        'comments': comments
    })
};

CommentService.prototype.receiveNewComment = function (comment) {
    let comments = this.appStateService.getState().comments.map(function (comment) { return comment });
    comments.push(comment);
    let states = {};
    states[AppState.COMMENTS] = comments;
    this.appStateService.set(states);
};

CommentService.prototype.start = function () {
    this.realTimeService.subscribe({
            channel: "NewCommentChannel",
            id: uuidv4(),
            url: window.location.href
        },
        this.channelHandlers);
};

CommentService.prototype.addComment = function (user, url, comment) {
    chrome.runtime.sendMessage({
        id: RequestMessage.POST,
        request: this.weignInAPI.addComment(user, url, comment)
    });
};

