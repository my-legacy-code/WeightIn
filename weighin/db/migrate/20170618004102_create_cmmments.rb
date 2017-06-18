class CreateCmmments < ActiveRecord::Migration[5.1]
  def change
    create_table :cmmments do |t|
      t.text :body
      t.string :url

      t.timestamps
    end
  end
end
