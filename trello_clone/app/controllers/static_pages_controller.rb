class StaticPagesController < ApplicationController
  def root
    redirect_if_not_signed_in
  end

end
