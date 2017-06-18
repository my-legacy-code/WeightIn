class CreateHighlights < ActiveRecord::Migration[5.1]
  def change
    create_table :highlights do |t|
      t.integer :start
      t.integer :end
      t.string :element_id

      t.timestamps
    end
  end
end
