class ApplicationController < ActionController::API
  before_action :autheticate_user!
end
