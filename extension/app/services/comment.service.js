function CommentService(receiveDataCallbacks) {
    ActionCable.startDebugging();
    this.cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    var self = this;
    this.cable.subscriptions.create({
            channel: "NewCommentChannel",
            id: uuidv4(),
            url: window.location.href
        },
        {
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
        });
}