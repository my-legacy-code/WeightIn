function CommentService(receiveDataCallbacks) {
    var serverName = 'localhost';
    var serverPort = 3000;
    var serverNamePort = serverName + ':' + serverPort;
    this.serverURL = 'http://' + serverNamePort;
    this.webSocketURI = 'ws://' + serverNamePort;
    ActionCable.startDebugging();
    this.cable = ActionCable.createConsumer(this.webSocketURI + '/cable');
    var self = this;
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
                    receiveDataCallbacks.receiveAllComments(data['comments']);
                    break;
                case 'new_comment':
                    receiveDataCallbacks.receiveNewComment(data['comment']);
                    break;
            }
        }
    };
}

CommentService.prototype.start = function () {

    this.cable.subscriptions.create({
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

