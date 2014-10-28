class Tool < ActiveRecord::Base
	has_many :line_items
  accepts_nested_attributes_for :line_items,  :reject_if => :all_blank, :allow_destroy => true

  acts_as_taggable

  has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  validates :quantity, :presence => true

  def quantity_on_hand
    outstanding_line_items = line_items.where("return_date is null")
    issuance_total = outstanding_line_items.map{ |line_item| line_item.quantity }.sum
    (quantity || 0) - (issuance_total || 0)
  end

end
