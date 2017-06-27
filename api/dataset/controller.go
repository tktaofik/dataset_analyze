package dataset

import (
	"net/http"

	"github.com/labstack/echo"

	"github.com/tktaofik/qlik_analyze/api/dao"
	model "github.com/tktaofik/qlik_analyze/api/models"
)

type Dataset struct {}

type DatasetHandler interface {
	GetDatasets() error
	SaveDataSet() error
}

func (ctrl Dataset) Welcome(c echo.Context) error {
	return c.String(http.StatusOK, "Qlik Analyze")
}

func (ctrl Dataset) GetDatasets(c echo.Context) error {
	result, _ := dao.GetDatasets()

	return c.JSON(http.StatusOK, result)
}

func (ctrl Dataset) SaveDataSet(c echo.Context) error {
	dataset := new(model.Dataset)

	if err := c.Bind(dataset); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Unable to Bind SaveDataSet request body to dataset model struct")
	}

	result, err := dao.CreateDataSet(*dataset); if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Unable to create dataset source")
	}

	return c.JSON(http.StatusCreated, result)
}