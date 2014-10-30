class LineItemsController < ApplicationController
	def index
		@issuance = Issuance.find(params[:issuance_id])
		@line_items = LineItem.all
	end
	
	def update
		@line_item = LineItem.find(params[:id])
		@line_item.return_date = Time.now
		@line_item.save
		redirect_to :back
	end
end
