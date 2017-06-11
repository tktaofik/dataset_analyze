package routes

import (
	"github.com/labstack/echo"

	"github.com/tktaofik/qlik_analyze/server/controllers"
)


func Setup(r *echo.Echo) *echo.Echo {
	// Dataset routes
	r.GET("/", controllers.SaveDataset)

	return r
}
