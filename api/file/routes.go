package file

import (
	"github.com/labstack/echo"
)

func Init(h *echo.Echo)  {
	s := new(service)

	h.GET("/api/v1/datasets/", s.GetDatasets)
	h.POST("/api/v1/datasets/", s.SaveFileAsDataset)
}
