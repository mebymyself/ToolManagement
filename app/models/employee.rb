class Employee < ActiveRecord::Base

	belongs_to :account
	has_many :issuances

	accepts_nested_attributes_for :issuances, :reject_if => :all_blank, :allow_destroy => true

	has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
	validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      employee = Employee.find_or_create_by(:barcode => row["barcode"])
      row.to_hash.each do |key, value|
        if employee.has_attributes?(key)
          employee.send("#{key}=", value)
        end
      end
      employee.save!
    end
  end

end
