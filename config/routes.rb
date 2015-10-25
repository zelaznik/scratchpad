Rails.application.routes.draw do
  root to: "static_pages#index"
  get 'index', to: "static_pages#index"
  get 'about', to: "static_pages#about"
  get 'home', to: 'static_pages#home'
  get 'contact', to: 'static_pages#contact'
end
