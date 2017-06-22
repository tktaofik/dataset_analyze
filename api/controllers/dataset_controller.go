package controllers

import (
	"net/http"

	"github.com/labstack/echo"

	"github.com/tktaofik/qlik_analyze/api/dao"
	model "github.com/tktaofik/qlik_analyze/api/models"
)

//TODO: I should actually have an interface here of the controller type, this will let me create custom testing functions instead so i don't pollute my database

type Error struct {
	message string `json:"name" xml:"name"`
}

func Welcome(c echo.Context) error {
	return c.String(http.StatusOK, "Qlik Analyze")
}

func GetDatasets(c echo.Context) error {
	result, _ := dao.GetDatasets()

	return c.JSON(http.StatusOK, result)
}

func SaveDataSet(c echo.Context) error {
	dataset := new(model.Dataset)

	if err := c.Bind(dataset); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Unable to Bind SaveDataSet request body to dataset model struct")
	}

	result, err := dao.CreateDataSet(*dataset); if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Unable to create dataset source")
	}

	return c.JSON(http.StatusCreated, result)
}