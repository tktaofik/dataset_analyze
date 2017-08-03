package file

import (
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2"
)

var service Service

func Init(r *echo.Echo, s *mgo.Session) {

	service.DBSession = s

	r.POST("/api/v1/dataset/", service.saveFileAsDatasetHandler)
	r.GET("/api/v1/dataset/:id", service.getDatasetByIdHandler)
	r.GET("/api/v1/datasets/", service.getDatasetsHandler)
	r.PATCH("/api/v1/dataset/:id", service.updateDatasetHandler)
	r.DELETE("/api/v1/dataset/:id", service.deleteDatasetHandler)
}