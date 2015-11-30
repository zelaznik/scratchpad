class Api::PostsController < ApplicationController

  def show
    @post = Post.find(params[:id])
    render json: @post
  end

  def index
    render json: Post.all
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post
    else
      render json: @post.errors.full_messages #???
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors.full_messages
    end
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
      render json: 'Success!'
    else
      render json: @post.errors.full_messages
    end
  end

  private
  def post_params
    params.require(:post).permit(:title, :body)
  end
end
