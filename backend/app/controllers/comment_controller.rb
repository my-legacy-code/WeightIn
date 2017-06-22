class CommentController < ApplicationController

  def update
    comment_json = params.require(:comment).permit(:user, :url, :body)
    user = comment_json[:user]
    url = comment_json[:url]
    body = comment_json[:body]


    comment = Comment.new(user: user,  url: url, body: body)
    comment.save!
    ActionCable.server.broadcast "new_comment_#{url}",  message_type: :new_comment, comment: comment
    head :ok
  end

  def show
    comments = Comment.where(url: params[:url])
    render :json => comments
  end

end
