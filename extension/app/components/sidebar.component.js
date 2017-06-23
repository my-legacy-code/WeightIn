function SideBarComponent(dependencies) {
    Component.call(this, {
        selector: 'weight-in-sidebar',
        templateUrl: 'app/components/sidebar.component.html',
        template: `
<div class="weigh-in-sidebar-header">
    <img class="icon" src="https://s3.us-east-2.amazonaws.com/weigh-in/icon256.png"/>
    <div class="title"><span>{{comments.length}}</span> Comments</div>
</div>
<ul id="weigh-in-sidebar-comment-list">
    {{#each comments}}
    <li>
        <div><span class="weigh-in-username">{{user}}</span>:&nbsp;{{body}}</div>
        <div class="weigh-in-datetime">{{created_at}}</div>
    </li>
    {{/each}}
</ul>
<div class="weigh-in-new-comment-box">
    <div>
        <textarea id="weigh-in-comment-input" class="weigh-in-comment-input"
                  placeholder="Please type your message here."></textarea>
    </div>
    <div>
        <div id="weigh-in-send-button" class="weigh-in-send-button">Send</div>
    </div>
</div>
        `
    });
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

    this.addComment = function () {
        var user = dependencies.appStateService.getState().currentUser,
            body = self.textfield.value;

        dependencies.commentService.addComment(user, window.location.href, body);
        self.textfield.value = "";
        self.scrollToBottom();
    };

    this.scrollToBottom = function () {
        var list = this.el.querySelector("#weigh-in-sidebar-comment-list");
        list.scrollTop = list.scrollHeight;
    };

    dependencies.appStateService.subscribe(function () {
        self.update({
            comments: dependencies.appStateService
                .getState()
                .comments
                .sort(function (first, second) {
                    return new Date(first.created_at).getTime() - new Date(second.created_at).getTime();
                }).map(function (comment) {
                    var newComment = Object.create(comment);
                    newComment.created_at = moment(comment.created_at).fromNow();
                    return newComment;
                })
        });
        self.scrollToBottom();
    });


    this.wrapPageContent();
}

SideBarComponent.prototype = Object.create(Component.prototype);

Component.prototype.bindEventListeners = function () {
    var self = this;
    this.textfield = this.el.querySelector("#weigh-in-comment-input");
    this.textfield.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            self.addComment();
        }
    });

    var sendButton = this.el.querySelector('#weigh-in-send-button');
    sendButton.addEventListener('click', self.addComment);
};