class Tool < ActiveRecord::Base
	has_many :issuances

  acts_as_taggable

  has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  validates :quantity, :presence => true

  def quantity_on_hand
    outstanding_issuances = issuances.where("returned_on is null")
    issuance_total = outstanding_issuances.map{ |issuance| issuance.quantity }.sum
    (quantity || 0) - (issuance_total || 0)
  end

end
