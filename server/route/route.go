package route

import (
	"net/http"

	"github.com/tktaofik/qlik_analyze_app/server/controller"
	"github.com/julienschmidt/httprouter"
)

// Load returns the routes and middleware
func Load() http.Handler {
	return middleware(routes())
}

// *****************************************************************************
// Routes
// *****************************************************************************
func routes() *httprouter.Router {
	r := httprouter.New()

	// Dataset
	r.GET("/", controller.Index)
	r.GET("/hello/:name", controller.Hello)

	return r
}

// *****************************************************************************
// Middleware
// *****************************************************************************
func middleware(h http.Handler) http.Handler {
	return h
}
