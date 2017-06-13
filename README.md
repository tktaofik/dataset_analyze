# App built with GoLang and React.js
Installation and set-up
* Install `Go` and configure GOPATH 
* Install `node` and `npm`
* Install `glide` golang dependency manager (https://glide.readthedocs.io/en/latest/getting-started/)
* Install client dependencies `npm install`
* Install server dependencies `glide install`, you might also need to do `go get` to install go dependencies
* Install fresh for server hot reload (https://github.com/pilu/fresh)
* Install Mongodb locally `sudo npm i -g mongodb-runner`
* Start Mongodb locally `mongodb-runner start`
* Start client `npm start`
* Start server `npm server` or `fresh` or `go run main.go`