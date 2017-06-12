package routes

import (
	"github.com/labstack/echo"

	controller "github.com/tktaofik/qlik_analyze/api/controllers"
)


func Init(r *echo.Echo)  {
	r.GET("/", controller.Welcome)
	r.GET("/api/datasets/", controller.GetDatasets)
	r.POST("/api/dataset/", controller.SaveDataset)
}