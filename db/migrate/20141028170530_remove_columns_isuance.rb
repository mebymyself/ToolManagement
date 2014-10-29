class RemoveColumnsIsuance < ActiveRecord::Migration
  def change
  	remove_column :issuances, :tool_id
  	remove_column :issuances, :quantity
  	remove_column :issuances, :due_date
  	remove_column :issuances, :returned_on
  	remove_column :issuances, :issued_on
  end
end


