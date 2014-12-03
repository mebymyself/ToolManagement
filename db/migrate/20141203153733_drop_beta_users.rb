class DropBetaUsers < ActiveRecord::Migration
  def change
    drop_table :beta_users
  end
end
