# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :line_item do
    issuance_id 1
    tool_id 1
    quantity 1
    due_date "2014-11-29 18:12:01"
    return_date "2014-11-29 18:12:01"
  end
end
