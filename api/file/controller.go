package file

import (
	"net/http"

	"github.com/labstack/echo"

)

type Controller struct {}


func (ctrl Controller) Welcome(c echo.Context) error {
	return c.String(http.StatusOK, "Qlik Analyze")
}

func (ctrl Controller) GetFiles(c echo.Context) error {
	result, _ := dao.GetDatasets()

	return c.JSON(http.StatusOK, result)
}

func (ctrl Controller) SaveFile(c echo.Context) error {
	dataset := new(model.Dataset)

	if err := c.Bind(dataset); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Unable to Bind SaveDataSet request body to dataset model struct")
	}

	result, err := dao.CreateDataSet(*dataset); if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Unable to create dataset source")
	}

	return c.JSON(http.StatusCreated, result)
}