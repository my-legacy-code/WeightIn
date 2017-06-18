function SideBarComponent() {
    this.el = document.createElement('weight-in-sidebar-component');
    this.el.innerHTML = '<div class="weigh-in-sidebar-header"></div>';
    this.width = 300;
    this.show = function () {
        console.log("Show");
    };

    this.hide = function () {
        console.log("Hide");
    };

    this.wrapPageContent = function () {
        this.page = document.createElement("weight-in-page");
        while (document.body.firstChild)
            this.page.appendChild(document.body.firstChild);

        document.body.appendChild(this.page);
        this.page.style.width = (document.documentElement.offsetWidth - this.width) + 'px';
    };

    this.wrapPageContent();
}