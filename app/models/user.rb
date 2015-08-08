class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}
  after_initialize :ensure_session_token
  attr_reader :password

  has_many :boards
  has_many :board_members
  has_many(
    :followed_boards,
    through: :board_members,
    source: :board
  )

  def self.find_by_credentials(username, password)
    user = self.find_by(username: username)
    (user && user.valid_password?(password)) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = nil
    ensure_session_token
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
