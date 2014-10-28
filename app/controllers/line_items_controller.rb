class LineItemsController < ApplicationController
	  def new
	    @line_item = Line_item.new
	  end

	  def create
	    @line_item = Line_item.new(line_item_params)

	    if @line_item.save
	      redirect_to "/issuances"
	    else
	      render :new
	    end
	  end

	  def update
	  end

	  def edit
	  end

	  def destroy
	  end

	  def index
	    @line_items = Line_item.all
	  end

	  def show
	  end
	end

	private

	def line_item_params
	  params.require(:line_item).permit(:incoming_tool_barcode, :quantity, :due_date, :return_date)
	end
end
