class StaticPagesController < ApplicationController
  def index
  end

  def about
  end

  def home
    render :index
  end
end
