class CreateBoardMembers < ActiveRecord::Migration
  def change
    create_table :board_members do |t|
      t.integer :user_id, null: false
      t.integer :board_id, null: false
      t.timestamps null: false
    end

    add_index :board_members, :user_id
    add_index :board_members, :board_id
    add_index :board_members, [:user_id, :board_id], unique: true

    add_foreign_key :board_members, :boards
    add_foreign_key :board_members, :users
  end
end
