class IssuancesController < ApplicationController
	def index
		@issuances = Issuance.all
	end

	def new
  	@issuance = Issuance.new
  end

  def create
  	@issuance = Issuance.new(issuance_params)

  	if @issuance.save
  		redirect_to "/issuances"
  	else
  		render :new
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
  	params.require(:issuance).permit(:incoming_employee_barcode, :incoming_tool_barcode, :issued_on, :due_date, :returned_on, :quantity)
  end


end