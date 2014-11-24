class Issuance < ActiveRecord::Base
  include PgSearch 
    pg_search_scope :search_including_tags,
    :against => [:employee_id] 

  attr_accessor :incoming_employee_barcode

  belongs_to :employee
  accepts_nested_attributes_for :employee, :reject_if => :all_blank

  has_many :line_items
  accepts_nested_attributes_for :line_items,  :reject_if => :all_blank, :allow_destroy => true


  delegate :barcode, :to => :employee, :prefix => true, :allow_nill => true

  before_save :add_employee_by_barcode, :default_outstanding_true

  def add_employee_by_barcode
    employee = Employee.find_by_barcode(self.incoming_employee_barcode)
    self.employee_id = employee.id
  end

  def default_outstanding_true #this is to make sure all new issuance to have o/s as true
    self.outstanding_status ||= true
  end

  def self.check_issuance_status(issuance_id) #this methods checks and updates if all line_items are returned
    @issuance = Issuance.find(issuance_id)
    outstanding = false
    @issuance.line_items.each do |line_item|
      outstanding = outstanding || line_item.return_date.nil?
    end
    @issuance.update_column(:outstanding_status, false) if !outstanding
  end

end
