class SubdomainPresent
	def self.matches?(request)
		request.subdomain.present?
	end
end

class SubdomainBlank
	def self.matches?(request)
		request.subdomain.blank?
	end
end

Rails.application.routes.draw do
  
  get 'employees/index'

  get 'employees/new'

  get 'employees/edit'

  get 'employees/show'

  constraints(SubdomainPresent) do 
  	root 'issuances#index', as: :subdomain_root
  	devise_for :users
  end
  
  constraints(SubdomainBlank) do 
	  root 'welcome#index'
	  resources :accounts, only: [:new, :create]
	end
end
