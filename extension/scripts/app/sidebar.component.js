function SideBarComponent() {
    this.el = document.createElement('weight-in-sidebar-component');
    this.el.innerHTML =
        '<div class="weigh-in-sidebar-header">' +
            '<img class="icon" src="https://s3.us-east-2.amazonaws.com/weigh-in/icon256.png"/>' +
                '<div class="title"><span>2</span> Comments</div>' +
        '</div>' +
        '<ul id="weigh-in-sidebar-comment-list">' +
            '<li>' +
                '<div><span class="weigh-in-username">3NYTimes</span>: Great article, checkout this other article by Maurine Dowd: https://www.nytimes.com/2017/05/27/opinion/sunday/trumps-hand-to-hand-combat.html</div>' +
                '<div class="weigh-in-datetime">1 second ago</div>' +
            '</li>' +
            '<li>' +
                '<div><span class="weigh-in-username">Feminist123</span>: This article only skims the surface of issues sur-rounding sexism in the United States.</div>' +
                '<div class="weigh-in-datetime">10 minutes ago</div>' +
            '</li>' +
            '<li>' +
                '<div><span class="weigh-in-username">US</span>: This is cool!</div>' +
                '<div class="weigh-in-datetime">June 5th</div>' +
            '</li>' +
            '<li>' +
            '<div><span class="weigh-in-username">3NYTimes</span>: Great article, checkout this other article by Maurine Dowd: https://www.nytimes.com/2017/05/27/opinion/sunday/trumps-hand-to-hand-combat.html</div>' +
            '<div class="weigh-in-datetime">1 second ago</div>' +
            '</li>' +
            '<li>' +
            '<div><span class="weigh-in-username">3NYTimes</span>: Great article, checkout this other article by Maurine Dowd: https://www.nytimes.com/2017/05/27/opinion/sunday/trumps-hand-to-hand-combat.html</div>' +
            '<div class="weigh-in-datetime">1 second ago</div>' +
            '</li>' +
            '<li>' +
            '<div><span class="weigh-in-username">3NYTimes</span>: Great article, checkout this other article by Maurine Dowd: https://www.nytimes.com/2017/05/27/opinion/sunday/trumps-hand-to-hand-combat.html</div>' +
            '<div class="weigh-in-datetime">1 second ago</div>' +
            '</li>' +
            '<li>' +
            '<div><span class="weigh-in-username">3NYTimes</span>: Great article, checkout this other article by Maurine Dowd: https://www.nytimes.com/2017/05/27/opinion/sunday/trumps-hand-to-hand-combat.html</div>' +
            '<div class="weigh-in-datetime">1 second ago</div>' +
            '</li>' +
            '<li>' +
            '<div><span class="weigh-in-username">3NYTimes</span>: Great article, checkout this other article by Maurine Dowd: https://www.nytimes.com/2017/05/27/opinion/sunday/trumps-hand-to-hand-combat.html</div>' +
            '<div class="weigh-in-datetime">1 second ago</div>' +
            '</li>' +
        '</ul>' +
        '<div class="weigh-in-new-comment-box">' +
            '<div>' +
                '<textarea class="weigh-in-comment-input" placeholder="Please type your message here."></textarea>' +
            '</div>'+
            '<div>' +
                '<div class="weigh-in-send-button">Send</div>' +
            '</div>' +
        '</div>';
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

    this.wrapPageContent();
}