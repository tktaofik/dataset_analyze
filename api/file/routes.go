package file

import (
	"net/http"

	"github.com/labstack/echo"
)

var (
	s = new(Service)
)

func Init(r *echo.Echo)  {
	r.GET("/api/v1/datasets/", getDatasetsHandler)
	r.POST("/api/v1/datasets/", saveFileAsDatasetHandler)
}

func saveFileAsDatasetHandler(c echo.Context) error {
	dataset := new(Dataset)

	if err := c.Bind(dataset); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Unable to Bind request body to a dataset data type")
	}

	result, err := s.SaveFileAsDataset(*dataset)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusCreated, result)
}

func getDatasetsHandler(c echo.Context) error {
	result, err := s.GetDatasets()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, result)
}
