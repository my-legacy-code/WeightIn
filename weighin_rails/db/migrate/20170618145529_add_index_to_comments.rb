class AddIndexToComments < ActiveRecord::Migration[5.1]
  def change
    add_index :comments, :url, :unique => false
  end
end
