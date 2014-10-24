class CreateIssuances < ActiveRecord::Migration
  def change
    create_table :issuances do |t|
      t.integer :employee_id
      t.datetime :issuance_date
      t.integer :user_id

      t.timestamps
    end
  end
end
