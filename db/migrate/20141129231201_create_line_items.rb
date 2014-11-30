class CreateLineItems < ActiveRecord::Migration
  def change
    create_table :line_items do |t|
      t.integer :issuance_id
      t.integer :tool_id
      t.integer :quantity
      t.datetime :due_date
      t.datetime :return_date

      t.timestamps
    end
  end
end
