# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :tool do
    t_barcode "MyString"
    description "MyText"
    quanity 1
    quantity_on_hand 1
    notes "MyText"
  end
end
