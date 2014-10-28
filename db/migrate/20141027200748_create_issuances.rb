class CreateIssuances < ActiveRecord::Migration
  def change
    create_table :issuances do |t|
      t.integer :employee_id
      t.integer :tool_id
      t.integer :quantity
      t.datetime :issued_on
      t.datetime :due_date
      t.datetime :returned_on

      t.timestamps
    end
  end
end
