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

  constraints(SubdomainPresent) do 
  	root 'issuances#index', as: :subdomain_root
  	devise_for :users
  	
    resources :search
    resources :settings, only: [:index] 
  	resources :issuances do
      resources :line_items, :shallow => true
    end
    resources :employees do 
      collection { post :import }
    end
    resources :tools do 
      collection { post :import }
    end

    get 'tags/:tag', to: 'tools#index', as: :tag
  end

  constraints(SubdomainBlank) do 
	  root 'welcome#index'
	  resources :accounts, only: [:new, :create]
	end

end
