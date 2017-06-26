class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.string :user
      t.text :body
      t.string :url

      t.timestamps
    end
  end
end
