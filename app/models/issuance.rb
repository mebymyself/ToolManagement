class Issuance < ActiveRecord::Base
	belongs_to :employee
	belongs_to :user
	has_many :tools

	accepts_nested_attributes_for :line_items
end
