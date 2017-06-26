class CommentController < ApplicationController

  def update
    message_json = params[:comment]
    user = message_json[:user]
    url = message_json[:url]
    body = message_json[:text]


    message = Comment.new(user: user,  url: url, body: body)
    puts message
    message.save!

  end

  def show
    comments = Comment.where(url: params[:url])
    puts comments


    render :json => convert_to_json(comments)
  end

end
