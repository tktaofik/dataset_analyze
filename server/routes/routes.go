package routes

import (
	"github.com/labstack/echo"

	"github.com/tktaofik/qlik_analyze/server/controller"
)


func Setup(r *echo.Echo) *echo.Echo {
	// Dataset routes
	r.GET("/", controller.SaveDataset)

	return r
}
