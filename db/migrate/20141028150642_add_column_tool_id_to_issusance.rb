class AddColumnToolIdToIssusance < ActiveRecord::Migration
  def change
  	add_column :issuances, :tool_id, :integer
  end
end
