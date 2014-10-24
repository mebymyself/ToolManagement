class Employee < ActiveRecord::Base
	belongs_to :account
	has_many :issuances
end
