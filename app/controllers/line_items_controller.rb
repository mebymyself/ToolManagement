class LineItemsController < ApplicationController
	def index
		@issuance = Issuance.find(params[:issuance_id])
		@line_items = LineItem.all
	end
	
	def update
		@line_item = LineItem.find(params[:id])
		@line_item.return_date = Time.now
		@line_item.save
		Issuance.check_issuance_status(@line_item.issuance_id) #this goes through all the line_items in that issuance to see if all the line_items are returned
		redirect_to :back
	end
end
