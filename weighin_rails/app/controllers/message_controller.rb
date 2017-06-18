class MessageController < ApplicationController

  def update
    binding.pry
    message_json = params[:message]
    user = message_json[:user]
    text = message_json[:text]
    highlight_id = message_json[:highlight_element_id]
    message = Message.new(user: user, content: text)
    message.save!

  end

  def show
   # message =  Message.where("highlight_id = #{highlight_id}")
    @message.each do |m|
      puts m.highlight
    end

  end
end