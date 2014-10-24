class Issuance < ActiveRecord::Base
	belongs_to :employee
	belongs_to :user
	has_many :line_items
	has_many :tools
end
