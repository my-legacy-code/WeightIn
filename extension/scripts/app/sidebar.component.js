function SideBarComponent() {
    this.el = document.createElement('weight-in-sidebar-component');
    this.el.innerHTML =
        '<div class="weigh-in-sidebar-header">' +
            '<img class="icon" src="https://s3.us-east-2.amazonaws.com/weigh-in/icon256.png"/>' +
                '<div class="title"><span>2</span> Comments</div>' +
        '</div>';
    this.width = 300;
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