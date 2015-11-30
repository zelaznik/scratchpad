class CreateApplications < ActiveRecord::Migration
  def change
    create_table :applications do |t|
      t.integer :user_id, null: false
      t.integer :company_id, null: false
      t.string :title
      t.string :url
      t.binary :cover_letter
      t.binary :resume
      t.integer :status_id

      t.timestamps null: false
    end

    add_foreign_key :applications, :companies
    add_foreign_key :applications, :users
    add_foreign_key :applications, :statuses
  end
end
