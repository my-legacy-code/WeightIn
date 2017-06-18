class MessageController < ApplicationController

  def update
    message_json = params[:message]
    user = message_json[:user]
    text = message_json[:text]
    highlight_id = message_json[:highlight_element_id]

    message = Highlight.messages.create(user: user, content: text)
    #message = Message.new(user: user, content: text)
    #message.save!

  end

  def show

    messages = Message.where()
  end
end