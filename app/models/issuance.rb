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

  before_save :add_employee_by_barcode

  def add_employee_by_barcode
    employee = Employee.find_by_barcode(self.incoming_employee_barcode)
    self.employee_id = employee.id
  end





end
