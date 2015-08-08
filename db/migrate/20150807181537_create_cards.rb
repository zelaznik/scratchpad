class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.integer :list_id, null: false
      t.string :title, null: false
      t.string :description, null: false
      t.integer :ord, null: false, default: 0

      t.timestamps null: false
    end

    add_index :cards, :list_id
    add_foreign_key :cards, :lists
  end
end
