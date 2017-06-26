class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.belongs_to :highlight, index: true
      t.text :content
      t.string :user
      t.string :highlight_id
      t.timestamps
    end
  end
end
