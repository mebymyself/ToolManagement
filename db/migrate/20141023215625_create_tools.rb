class CreateTools < ActiveRecord::Migration
  def change
    create_table :tools do |t|
      t.string :barcode
      t.text :description
      t.integer :quantity
      t.text :notes

      t.timestamps
    end
  end
end
