class Issuance < ActiveRecord::Base
	belongs_to :user
	belongs_to :employee
	has_many :tools

end
