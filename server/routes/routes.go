package routes

import (
	"github.com/labstack/echo"

	"github.com/tktaofik/qlik_analyze/server/controller"
	"gopkg.in/mgo.v2"
)


func Setup(r *echo.Echo, s *mgo.Session) *echo.Echo {
	// Dataset routes
	r.GET("/", controller.SaveDataset)
	r.POST("/dataset/:id", controller.GetDataset)

	return r
}
