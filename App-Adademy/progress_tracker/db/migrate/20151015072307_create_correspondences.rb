class CreateCorrespondences < ActiveRecord::Migration
  def change
    create_table :correspondences do |t|
      t.integer :application_id
      t.integer :medium_id
      t.boolean :is_received
      t.text :notes
      t.binary :attachment

      t.timestamps null: false
    end

    add_foreign_key :correspondences, :applications
    add_foreign_key :correspondences, :media
  end
end
