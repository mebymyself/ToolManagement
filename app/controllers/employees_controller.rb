class EmployeesController < ApplicationController

  def index
  	@employees = if params[:search]
      Employee.where("(barcode) LIKE (?)", "%#{params[:search]}")
    else
      Employee.all
    end
    # The JSON request will return employee attributes and avatar url
    respond_to do |format|
      format.html
      format.json {render json: @employees.to_json(:methods => [:avatar_url])}
    end
  end


  def new
  	@employee = Employee.new
  end


  def create
  	@employee = Employee.new(employee_params)
     if @employee.save
      redirect_to "/employees"
    else
      render :new
    end
  end

  def import
    Employee.import(params[:file])
    redirect_to settings_path, notice: "Employees imported."
  end

  def show
  	@employee = Employee.find(params[:id])
  end

  def edit
  	@employee = Employee.find(params[:id])
  end

  def update
  	@employee = Employee.find(params[:id])

  	if @employee.update_attributes(employee_params)
  		redirect_to @employee
  	else
  		render :edit
  	end
  end

  def destroy
  	@employee = Employee.find(params[:id])

    if @employee.destroy
  	   redirect_to employees_url
       flash.now[:notice] = "Delete Successful"
     else
       flash.now[:error] = "Issuances are associated with this employee and cannot be deleted"
       render :edit
     end
  end


  private

  def employee_params
  	params.require(:employee).permit(:first_name, :last_name, :barcode, :tag_list, :avatar, :file)
  end


end
