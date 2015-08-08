class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :card_id, null: false
      t.boolean :done?, null: false, default: false
      t.string :title, null: false

      t.timestamps null: false
    end

    add_index :items, :card_id
    add_foreign_key :items, :cards
  end
end
