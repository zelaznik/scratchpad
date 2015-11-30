class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.integer :board_id
      t.string :title, null: false
      t.string :description, null: false

      t.timestamps null: false
    end

    add_index :lists, :board_id
    add_index :lists, [:board_id, :title], unique: true
    add_foreign_key :lists, :boards
  end
end
