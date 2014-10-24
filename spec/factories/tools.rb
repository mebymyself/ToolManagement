# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :tool do
    tool_barcode "MyString"
    description "MyText"
    quantity 1
    notes "MyText"
  end
end
