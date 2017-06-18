class CreateHighlights < ActiveRecord::Migration[5.1]
  def change
    create_table :highlights do |t|
      t.string :color
      t.string :url
      t.integer :start
      t.integer :length

      t.timestamps
    end
  end
end
