package routes

import (
	"github.com/labstack/echo"

	controller "github.com/tktaofik/qlik_analyze/api/controllers"
)

func Init(r *echo.Echo)  {
	datasetCtrl := controller.Dataset{}

	r.GET("/", datasetCtrl.Welcome)
	r.GET("/api/datasets/", datasetCtrl.GetDatasets)
	r.POST("/api/datasets/", datasetCtrl.SaveDataSet)
	r.PUT("/api/datasets/:id", datasetCtrl.SaveDataSet)
}
