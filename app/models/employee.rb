class Employee < ActiveRecord::Base
  include PgSearch 
    pg_search_scope :search_including_tags, 
    :against => [:first_name, :last_name, :barcode]

	belongs_to :account
	has_many :issuances

	accepts_nested_attributes_for :issuances, :reject_if => :all_blank, :allow_destroy => true

	has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
	validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      employee = Employee.find_or_create_by(:barcode => row["barcode"])
      row.to_hash.each do |key, value|
        if employee.has_attribute?(key)
          employee.send("#{key}=", value)
        end
      end
      employee.save!
    end
  end

  # This method is defined so that the view(JS) can access to an actual url without depending on paperclips' helper method
  def avatar_url
    avatar.url(:medium)
  end

  def self.any_outstanding(employee_id)
    @employee = Employee.find(employee_id)
    outstanding = false
    @employee.issuances.each do |issuance|
      issuance.line_items.each do |line_item|
        outstanding = outstanding || line_item.return_date.nil?
      end
    end
    return outstanding
  end
  
end
