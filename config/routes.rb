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

  get 'line_item/new'

  get 'line_item/create'

  get 'line_item/update'

  get 'line_item/edit'

  get 'line_item/destroy'

  get 'line_item/index'

  get 'line_item/show'

  constraints(SubdomainPresent) do 
  	root 'issuances#index', as: :subdomain_root
  	devise_for :users
  	resources :issuances
  	resources :employees
    resources :tools
    get 'tags/:tag', to: 'tools#index', as: :tag
  end
  
  constraints(SubdomainBlank) do 
	  root 'welcome#index'
	  resources :accounts, only: [:new, :create]
	end
end
