function WeignInAPI() {
    this.serverName = 'localhost';
    this.serverPort = 3000;
    this.serverNamePort = this.serverName + ':' + this.serverPort;
    this.serverURL = 'http://' + this.serverNamePort;
    this.webSocketURI = 'ws://' + this.serverNamePort;
    this.actionCable = ActionCable.createConsumer(this.webSocketURI + '/cable');
}

WeignInAPI.prototype.addComment = function (user, url, comment) {
    let headers = {
        'Content-Type': 'application/json'
    };
    let data = JSON.stringify({
        comment: {
            "user": user,
            "url": url,
            "body": comment
        }
    });
    return {
        url: this.serverURL + '/comments',
        queryParams: null,
        data: data,
        headers: headers
    };
};