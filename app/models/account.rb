class Account < ActiveRecord::Base
	RESTRICTED_SUBDOMAINS = %w(www admin toolhero tool)

	belongs_to :owner, class_name: 'User'
  has_many :employees

  validates :owner, presence: true
	validates :subdomain, presence: true,
												uniqueness: { case_sensitive: false },
												format: { with: /\A[\w\-]+\Z/i, message: 'contains invalid characters' },
												exclusion: { in: RESTRICTED_SUBDOMAINS, message: '%{value} is restricted' }

	accepts_nested_attributes_for :owner

	before_validation :downcase_subdomain

private
	def downcase_subdomain
		self.subdomain = subdomain.try(:downcase)
	end
end
