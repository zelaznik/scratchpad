class CreateCardAssignments < ActiveRecord::Migration
  def change
    create_table :card_assignments do |t|
      t.integer :card_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :card_assignments, :card_id
    add_index :card_assignments, :user_id
    add_index :card_assignments, [:card_id, :user_id], unique: true

    add_foreign_key :card_assignments, :cards
    add_foreign_key :card_assignments, :users
  end
end
