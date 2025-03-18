class RankingItemsController < ApplicationController
    protect_from_forgery with: :null_session
  
    def index
      @items = RankingItem.order(:position)
      render json: @items
    end
  
    def update
      params[:order].each_with_index do |id, index|
        item = RankingItem.find(id)
        item.update(position: index + 1, rank_count: item.rank_count + 1)
      end
      render json: { status: "success" }
    end
  end
  