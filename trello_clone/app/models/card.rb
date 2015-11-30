class Card < ActiveRecord::Base
  belongs_to :user
  has_many :items
  has_many :card_assignments
  has_many(
    :assigned_users,
    through: :card_assignments,
    source: :user
  )
end
