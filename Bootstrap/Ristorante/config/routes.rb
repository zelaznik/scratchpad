Rails.application.routes.draw do
  root to: "static_pages#home"
  get 'index.html', to: "static_pages#home"
  get 'home.html', to: "static_pages#home"
  get 'aboutus.html', to: "static_pages#about"
  get 'contactus.html', to: 'static_pages#contact'

  get 'scratchpad', to: 'static_pages#scratchpad'
end
