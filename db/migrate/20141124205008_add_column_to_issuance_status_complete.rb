class AddColumnToIssuanceStatusComplete < ActiveRecord::Migration
  def change
    add_column :issuances, :outstanding_status, :boolean
  end
end
