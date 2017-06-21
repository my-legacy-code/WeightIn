function SideBarComponent(dependencies) {
    this.el = document.createElement('weight-in-sidebar');
    this.el.innerHTML =
        '<div class="weigh-in-sidebar-header">' +
            '<img class="icon" src="https://s3.us-east-2.amazonaws.com/weigh-in/icon256.png"/>' +
                '<div class="title"><span>2</span> Comments</div>' +
        '</div>' +
        '<ul id="weigh-in-sidebar-comment-list">' +
        '</ul>' +
        '<div class="weigh-in-new-comment-box">' +
            '<div>' +
                '<textarea id="weigh-in-comment-input" class="weigh-in-comment-input" placeholder="Please type your message here."></textarea>' +
            '</div>'+
            '<div>' +
                '<div id="weigh-in-send-button" class="weigh-in-send-button">Send</div>' +
            '</div>' +
        '</div>';
    this.textfield = this.el.querySelector("#weigh-in-comment-input");
    this.width = 350;
    var self = this;
    this.show = function () {
        self.page.style.width = (document.documentElement.offsetWidth - this.width) + 'px';
        this.el.style.right = '0';
    };

    this.hide = function () {
        self.page.style.width = document.documentElement.offsetWidth + 'px';
        this.el.style.right = (-self.width) + 'px';
    };

    this.wrapPageContent = function () {
        self.page = document.createElement("weight-in-page");

        while (document.body.firstChild)
            this.page.appendChild(document.body.firstChild);

        document.body.appendChild(this.page);
        self.hide();
    };

    this.submitComment = function() {
        var username = dependencies.appStateService.getState().currentUser.username;
        var datetime = new Date();

        var comment = self.textfield.value;
        // get comment data and pass to append message
        dependencies.appStateService.getState().comments.push({username: username, datatime: datetime, comment: comment});
        dependencies.appStateService.update();
        self.textfield.value = "";
        var list = self.el.querySelector("#weigh-in-sidebar-comment-list");
        list.scrollTop = list.scrollHeight;
    };

    this.textfield.addEventListener('keypress', function (e) {
       if(e.keyCode === 13) {
           self.submitComment();
       }
    });

    this.appendMessage = function(comment) {
        var listEle = self.el.querySelector("#weigh-in-sidebar-comment-list");
        var newComment = document.createElement('li');
        newComment.innerHTML = '<div><span class="weigh-in-username">'+comment.user+'</span>: '+comment.body+'</div>' +
            '<div class="weigh-in-datetime">'+moment(comment.created_at).fromNow()+'</div>';
        listEle.appendChild(newComment);
    };

    var sendButton = this.el.querySelector('#weigh-in-send-button');
    // onClick's logic below:
    sendButton.addEventListener('click', this.submitComment);


    dependencies.appStateService.subscribe(function () {
        dependencies.appStateService.getState().comments.forEach(function (comment) {
            self.appendMessage(comment);
        });
    });

    dependencies.appStateService.getState().comments.forEach(function (comment) {
        self.appendMessage(comment);
    });

    this.wrapPageContent();
}