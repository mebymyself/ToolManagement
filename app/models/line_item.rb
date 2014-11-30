class LineItem < ActiveRecord::Base

  include PgSearch
  pg_search_scope :search_including_tags,
  :against => [:issuance_id, :tool_id, :due_date, :return_date]

  attr_accessor :incoming_tool_barcode

  belongs_to :issuance
  belongs_to :tool

  validate :quantity_is_available, unless: :return_date?
  validate :quantity_on_hand_cannot_be_less_than_zero, unless: :return_date?
  # validates_uniqueness_of :tool_id, :scope => "issuance_id"

  delegate :barcode, :to => :tool, :prefix => true, :allow_nill => true

  before_validation :add_tool_by_barcode

  # Quantity on hand method is in tool.rb

  def add_tool_by_barcode
    tool = Tool.find_by_barcode(self.incoming_tool_barcode)
    unless tool.blank?
      self.tool_id = tool.id
    end
  end

  def quantity_on_hand_cannot_be_less_than_zero
    if tool.quantity_on_hand < 1
      errors.add(:quantity_on_hand, " is #{tool.quantity_on_hand}.")
    end
  end

  def quantity_is_available
    if quantity > tool.quantity
      errors.add(:quantity, " available: #{tool.quantity}")
    end
  end


end
