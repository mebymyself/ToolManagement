# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :issuance do
    employee_id 1
    tool_id 1
    issued_quantity 1
    issued_on "2014-10-27 16:07:48"
    due_date "2014-10-27 16:07:48"
    returned_on "2014-10-27 16:07:48"
  end
end
