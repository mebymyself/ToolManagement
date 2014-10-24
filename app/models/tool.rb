class Tool < ActiveRecord::Base
	belongs_to :issuance
  has_one :line_item

  acts_as_taggable
end
