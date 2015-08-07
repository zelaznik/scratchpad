class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.integer :user_id
      t.string :title
      t.timestamps null: false
    end

    add_index :boards, [:user_id, :title], unique: true
    add_foreign_key :boards, :users
  end
end
