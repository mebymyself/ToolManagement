class AddColumnsToIssuance < ActiveRecord::Migration
  def change
  	add_column :issuances, :tool_id, :integer
  	add_column :issuances, :due_date, :datetime
  	add_column :issuances, :return_date, :datetime
  	add_column :issuances, :outgoing_condition, :string
  	add_column :issuances, :incoming_condition, :string
  	add_column :issuances, :quantity, :integer
  	remove_column :issuances, :user_id
  end
end




