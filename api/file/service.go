// Package file provides the use-case of saving, updating deleting and analyzing a file
package file

import (
	"net/http"

	"github.com/labstack/echo"
)


type Service interface {
	SaveFileAsDataset(c echo.Context) (error)
	GetDatasets(c echo.Context) (error)
}

type service struct {
	Dao
}

func (s service) SaveFileAsDataset(c echo.Context) error {
	dataset := new(Dataset)

	if err := c.Bind(dataset); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Unable to Bind SaveDataSet request body to dataset model struct")
	}

	result, err := s.Dao.SaveFileAsDataset(*dataset); if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Unable to create dataset source")
	}

	return c.JSON(http.StatusCreated, result)
}

func (s service) GetDatasets(c echo.Context) error {
	result, _ := s.Dao.GetDatasets()

	return c.JSON(http.StatusOK, result)
}