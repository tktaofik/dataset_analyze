package file

import (
	"net/http"

	"github.com/labstack/echo"
)

func (fs Service) saveFileAsDatasetHandler(c echo.Context) error {
	dataset := new(Dataset)

	if err := c.Bind(dataset); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	result, err := fs.SaveDataset(*dataset)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, result)
}

func (fs Service) getDatasetsHandler(c echo.Context) error {
	result, err := fs.GetDatasets()
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}

	return c.JSON(http.StatusOK, result)
}

func (fs Service) getDatasetByIdHandler(c echo.Context) error {
	id := c.Param("id")

	if len(id) == 24 {
		result, err := fs.GetDatasetById(id)
		if err != nil {
			return echo.NewHTTPError(http.StatusNotFound, err.Error())
		}

		return c.JSON(http.StatusOK, result)
	} else {
		return echo.NewHTTPError(http.StatusNotFound, "Invalid id length, length should be 24")
	}
}

func (fs Service) updateDatasetHandler(c echo.Context) error {
	dataset := new(Dataset)

	id := c.Param("id")

	if err := c.Bind(dataset); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	result, err := fs.UpdateDataset(id, *dataset)
	if err != nil {
		return echo.NewHTTPError(http.StatusForbidden, err.Error())
	}

	return c.JSON(http.StatusOK, result)
}

func (fs Service) deleteDatasetHandler(c echo.Context) error {
	id := c.Param("id")

	if id != "" {
		result, err := fs.DeleteDataset(id)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, customResponse{Message: "Dataset deleted", Id: id, Result: result})
	}

	return echo.NewHTTPError(http.StatusInternalServerError, "Missing the dataset id in the request body")
}
