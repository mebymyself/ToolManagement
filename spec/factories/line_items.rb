# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :line_item do
    issuance_id 1
    tool_id 1
    quantity 1
    tool_issued_at "2014-10-23 18:28:16"
    due_date "2014-10-23 18:28:16"
  end
end
