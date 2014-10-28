class AddColumnsToTools < ActiveRecord::Migration
  def change
  	remove_column :issuances, :tool_id
  	add_column :tools, :issuance_id, :integer
  	add_column :tools, :model_number, :string
  	add_column :tools, :warranty_end, :datetime
  	add_column :tools, :calibration_end, :datetime

  end
end


