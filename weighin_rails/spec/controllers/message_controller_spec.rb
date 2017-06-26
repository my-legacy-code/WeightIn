require 'rails_helper.rb'

describe Message do
  it "checks test" do

    post '/messages'
  end

  def message_json
    @message_json = {
        "message": {
            "user": "bob",
            "text": "this is a message",
            "highlight_element_id": "1234bnmn"
        }
    }
  end
end