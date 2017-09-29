class PagesController < ApplicationController

  def fetch

    # Test this proxy in the Chrome Javascript console with a line of jQuery like:
    #
    # $.ajax('http://localhost:3000/fetch?password=passy&url=http://www.smh.com.au/')
    # .done(function(response){
    #   console.log(response);
    # });

    # Require a (plaintext) password to prevent anyone from using our proxy
    # Note the use of 'return' before the render to return from this action, i.e.
    # prevent the rest of the code from running
    unless params[:password].present? && params[:password] == 'chicken'
      return render status: 500
    end

    # Actually go and get the page contents; HTTParty makes a request that looks like
    # a standard browser request, so there's no problem retrieving the page
    url = params[:url]
    response = HTTParty.get url unless url.empty?

    # This is the magic header that causes our proxy to accept any AJAX request;
    # the absence of this header on most sites is the reason we need this proxy server
    headers['Access-Control-Allow-Origin'] = '*'

    # To just send back the requested page contents as raw text:
    # render :text => response

    # To send a structured JSON response:
    render :json => {data: response}

  end

end
