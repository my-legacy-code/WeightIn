class CreateCOmments < ActiveRecord::Migration[5.1]
  def change
    create_table :c_omments do |t|
      t.text :body
      t.string :url

      t.timestamps
    end
  end
end
