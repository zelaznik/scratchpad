class UserMailer < ApplicationMailer
  default from: 'notifications@example.com'
  def welcome_email(user)
    @user = user
    @url = 'http://www.example.com/login'
    mail to: @user.email, subject: 'Welcome to my Awesome site'
  end
end
