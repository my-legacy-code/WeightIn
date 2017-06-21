class AddIndexToHighlights < ActiveRecord::Migration[5.1]
  def change
    add_index :highlights, :url, :unique => false
  end
end
