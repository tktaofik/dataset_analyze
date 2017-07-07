package file

import (
	"net/http"

	"github.com/labstack/echo"
)

var (
	fs = new(Service)
)

type customResponse struct {
	Message string `json:"message"`
	Err     string `json:"error"`
	Id      string `json:"id"`
	Result  string `json:"result"`
}

func Init(r *echo.Echo) {
	r.POST("/api/v1/dataset/", saveFileAsDatasetHandler)
	r.GET("/api/v1/dataset/:id", getDatasetByIdHandler)
	r.GET("/api/v1/datasets/", getDatasetsHandler)
	r.PATCH("/api/v1/dataset/:id", updateDatasetHandler)
	r.DELETE("/api/v1/dataset/:id", deleteDatasetHandler)
}

func saveFileAsDatasetHandler(c echo.Context) error {
	dataset := new(Dataset)

	if err := c.Bind(dataset); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	//TODO: inherit DB and use it here
	result, err := fs.SaveFileAsDataset(*dataset)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, result)
}

func getDatasetsHandler(c echo.Context) error {
	result, err := fs.GetDatasets()
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}

	return c.JSON(http.StatusOK, result)
}

func getDatasetByIdHandler(c echo.Context) error {
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

func updateDatasetHandler(c echo.Context) error {
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

func deleteDatasetHandler(c echo.Context) error {
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
