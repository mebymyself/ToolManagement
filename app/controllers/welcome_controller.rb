class WelcomeController < ApplicationController
	skip_before_filter :authenticate_user!
	def index
	end

  def pricing
  end

	def beta
	end

end
