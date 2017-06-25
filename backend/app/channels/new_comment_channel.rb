class NewCommentChannel < ApplicationCable::Channel
  def subscribed
    @id = params[:id]
    @url = params[:url]
    puts("id #{@id}, url #{@url}")
    stream_from "all_comments_#{@id}"
    stream_from "new_comment_#{@url}"
    ActionCable.server.broadcast "all_comments_#{@id}", message_type: :all_comments, comments: Comment.where(url: params[:url])
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive
    puts("Received #{params}")
  end
end
