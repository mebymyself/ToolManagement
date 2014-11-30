class Tool < ActiveRecord::Base
  include PgSearch
    pg_search_scope :search_including_tags,
    :against => [:description, :barcode],
    :associated_against => {:tags => [:name] }

	has_many :line_items
  accepts_nested_attributes_for :line_items,  :reject_if => :all_blank, :allow_destroy => true

  acts_as_taggable

  has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  validates :quantity, :presence => true

  before_destroy :ensure_not_referenced_by_any_line_items

  def quantity_on_hand
    outstanding_line_items = line_items.where("return_date is null")
    issuance_total = outstanding_line_items.map{ |line_item| line_item.quantity }.sum
    (quantity || 0) - (issuance_total || 0)
  end

  def self.import(file)
      CSV.foreach(file.path, headers: true) do |row|
        tool = Tool.find_or_create_by(:barcode => row["barcode"])
        row.to_hash.each do |key, value|
          if tool.has_attribute?(key)
            tool.send("#{key}=", value)
          end
        end
        tool.save!
      end
    end

  # This method is defined so that the view(JS) can access to an actual url without depending on paperclips' helper method
  def image_url
    image.url(:medium)
  end


  private

    def ensure_not_referenced_by_any_line_items
      if line_items.any?
        return false
      end
    end

end
