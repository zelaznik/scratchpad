class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true

  validates :password, length: {minimum: 6, allow_nil: true}
  after_initialize :ensure_session_token

  attr_reader :password

  def self.find_by_credentials(username, password)
    user = self.find_by(username: username)
    (user && user.valid_password?(password)) ? user: nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = self.new_token
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= new_token
  end

  def self.new_token
    SecureRandom.urlsafe_base64(16)
  end

end
