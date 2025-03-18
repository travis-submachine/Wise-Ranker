Rails.application.routes.draw do
  resources :ranking_items, only: [:index, :update]
end
