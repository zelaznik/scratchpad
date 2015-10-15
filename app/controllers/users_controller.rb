class UsersController < ApplicationController
  def new
    @user = User.new
    debugger
  end

  def create
    debugger
    @user = User.new(user_params)
    if @user.save && details.save
      sign_in @user
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end

end
