class LineItem < ActiveRecord::Base
	belongs_to :issuance
	belongs_to :tool
end
