function CommentService() {
    this.getComments = function (url) {
        return Request.get('http://localhost:3000/comments?url=' + url).then(function (data) {
            return JSON.parse(data);
        });
    };
}