package dataset

import "github.com/labstack/echo"

func MakeHandlers(h *echo.Echo)  {
	h.GET("/", controller.Welcome)
	h.GET("/api/datasets/", controller.GetDatasets)
	h.POST("/api/datasets/", controller.SaveDataSet)
	h.PUT("/api/datasets/:id", controller.SaveDataSet)
}
