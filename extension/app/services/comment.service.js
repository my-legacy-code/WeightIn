function CommentService(dependencies) {
    this.realTimeService = dependencies.realTimeService;
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
                    dependencies.receiveAllComments(data['comments']);
                    break;
                case 'new_comment':
                    dependencies.receiveNewComment(data['comment']);
                    break;
            }
        }
    };
}

CommentService.prototype.start = function () {

    this.realTimeService.subscribe({
            channel: "NewCommentChannel",
            id: uuidv4(),
            url: window.location.href
        },
        this.channelHandlers);
};

CommentService.prototype.addComment = function (user, url, comment) {
    var headers = {
        'Content-Type': 'application/json'
    };
    var data = JSON.stringify({
        comment: {
            "user": user,
            "url": url,
            "body": comment
        }
    });
    chrome.runtime.sendMessage({
        id: RequestMessage.POST,
        request: {
            url: this.serverURL + '/comments',
            queryParams: null,
            data: data,
            headers: headers
        }
    });
};

