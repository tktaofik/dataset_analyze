package dataset

import (
	"net/http"

	"github.com/labstack/echo"

	"github.com/tktaofik/qlik_analyze/api/dao"
	model "github.com/tktaofik/qlik_analyze/api/models"
)

func Welcome(c echo.Context) error {
	return c.String(http.StatusOK, "Qlik Analyze")
}

func GetDatasets(c echo.Context) error {
	id := c.Param("id")
	return c.String(http.StatusOK, id)
}

func SaveDataset(c echo.Context) error {
	dataset := new(model.Dataset)

	c.Bind(dataset)

	result, _ := dao.NewDataSet(*dataset)

	return c.JSON(http.StatusOK, result)
}