class ToolsController < ApplicationController
	
	def index
    if params[:search]
      @tools = Tool.where("(barcode) LIKE (?)", "%#{params[:search]}")
    elsif params[:tag]
      @tools = Tool.tagged_with(params[:tag])
    else
      @tools = Tool.all
    end

    # @tools = Tool.all.page(params[:page])
  	# @tools = Tool.order('tools.created_at DESC').page(params[:page]) 

    # The JSON request will return tool attributes and avatar url
    respond_to do |format|
      format.html
      format.json {render json: @tools.to_json(:methods => [:image_url])}
    end
  end


  def import
    Tool.import(params[:file])
    redirect_to settings_path, notice: "Tools imported."
  end


  def new
  	@tool = Tool.new
  end


  def create
  	@tool = Tool.new(tool_params)
    if @tool.save
      redirect_to "/tools"
    else
      render "new"
    end
  end


  def show
    @tool = Tool.find(params[:id])
  end


  def edit
  	@tool = Tool.find(params[:id])
  end


  def update
  	@tool = Tool.find(params[:id])

  	if @tool.update_attributes(tool_params)
  		redirect_to @tool
    else
      render :edit
    end
  end


  def destroy
    @tool = Tool.find(params[:id])
    @tool.destroy
    redirect_to tools_url
  end



  private

  def tool_params
  	params.require(:tool).permit(:barcode, :description, :quantity, :notes, :tag_list, :image, :file)
  end

end
