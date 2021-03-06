Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/messages' => 'message#show'
  post '/messages' => 'message#update'

  get '/highlights' => 'highlight#show'
  post '/highlights' => 'highlight#update'

  get '/comments' => 'comment#show'
  post '/comments' => 'comment#update'
  mount ActionCable.server => '/cable'

end
