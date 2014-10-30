class SearchController < ApplicationController

  def new
  	@tools = Tool.search_including_tags(params[:query])
  	@employees = Employee.search_including_tags(params[:query])
    @issuances = Issuance.search_including_tags(params[:query])
    # @line_items = Line_item.search_including_tags(params[:query])
  end

end