class Issuance < ActiveRecord::Base
	belongs_to :user
	belongs_to :employee
	belongs_to :tool

	# for cocoon
	accepts_nested_attributes_for :tool, :reject_if => :all_blank

end
