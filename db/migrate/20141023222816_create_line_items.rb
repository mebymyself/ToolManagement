class CreateLineItems < ActiveRecord::Migration
  def change
    create_table :line_items do |t|
      t.integer :issuance_id
      t.integer :tool_id
      t.integer :quantity
      t.datetime :tool_issued_at
      t.datetime :due_date

      t.timestamps
    end
  end
end
