package dataset

import (
	"net/http"
	"fmt"

	"github.com/labstack/echo"
	"github.com/Jeffail/gabs"

	"github.com/tktaofik/qlik_analyze/api/dao"
	model "github.com/tktaofik/qlik_analyze/api/models"
)

func Welcome(c echo.Context) error {
	return c.String(http.StatusOK, "Qlik Analyze")
}

func GetDatasets(c echo.Context) error {
	result, _ := dao.GetDatasets()

	return c.JSON(http.StatusOK, result)
}

func SaveDataset(c echo.Context) error {
	dataset := new(model.Dataset)

	if err := c.Bind(dataset); err != nil {
		return err
	}
	// JSON copy of the data
	jsonParsed, err := gabs.ParseJSON([]byte(dataset.Data))
	if err != nil {
		return err
	}
	fileName := jsonParsed.Path("fileName").Data()
	fmt.Print(fileName)

	result, err := dao.NewDataSet(*dataset); if err != nil{
		return c.JSON(http.StatusInternalServerError, result)
	}

	return c.JSON(http.StatusOK, result)
}