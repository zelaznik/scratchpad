class Board < ActiveRecord::Base
  has_many :board_members
  has_many :lists
  belongs_to :owner, class_name: "User", foreign_key: :user_id

  has_many(
    :members,
    through: :board_members,
    source: :
  )
end
