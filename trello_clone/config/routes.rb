Rails.application.routes.draw do
  root to: "static_pages#root"

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, {format: :json} do
    resources :boards
    resources :lists
    resources :cards
  end

end
