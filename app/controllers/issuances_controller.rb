class IssuancesController < ApplicationController
	def index
		@issuances = Issuance.all
	end

	def new
  	@issuance = Issuance.new
    @line_item = @issuance.line_items.build
  end

  def create
  	@issuance = Issuance.new(issuance_params)
  	if @issuance.save
  		redirect_to "/issuances"
  	else
  		render :new
    end
  end

  def issuance_modal
    respond_to do |format|               
      format.js
    end        
  end 

	def show
  	@issuance = Issuance.find(params[:id])
  end

  def edit
    @issuance = Issuance.find(params[:id])
  end

  def update
    @issuance = Issuance.find(params[:id])

    if @issuance.update_attributes(issuance_params)
      redirect_to @issuance
    else
      render :edit
    end 
  end

	private

	def issuance_params
    params.require(:issuance).permit(:incoming_employee_barcode, line_items_attributes: [:incoming_tool_barcode, :issuance_id, :tool_id, :quantity, :due_date, :return_date, :_destroy])
  end



end
