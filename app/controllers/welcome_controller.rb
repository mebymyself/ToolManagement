class WelcomeController < ApplicationController
	skip_before_filter :authenticate_user!, only: :index

	layout 'welcome'

	def index
	end

  def pricing
  end

end
