FactoryGirl.define do
  factory :user do
  	first_name 'Tabish'
  	last_name 'Iqbal'
  	sequence(:email) { |n| "email#{n}@gmail.com"}
  	password 'pw'
  end
end
