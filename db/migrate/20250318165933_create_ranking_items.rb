class CreateRankingItems < ActiveRecord::Migration[8.0]
  def change
    create_table :ranking_items do |t|
      t.string :name
      t.integer :position
      t.integer :rank_count

      t.timestamps
    end
  end
end
