class HighlightController < ApplicationController

  def update
    message_json = params[:highlight]
    user = message_json[:user]
    location_start = message_json[:start]
    location_end = message_json[:end]
    url = message_json[:url]
    element_id = message_json[:element_id]


    message = Highlight.new(user: user, start: location_start, end: location_end, url: url, element_id: element_id)
    puts message
    message.save!

  end

  def show
    highlights = Highlight.where(url: params[:url])
    puts highlights


    render :json => highlights
  end

end
