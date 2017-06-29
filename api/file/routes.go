package file

import (
	"net/http"

	"github.com/labstack/echo"
)

var (
	fs = new(Service)
)

type deleteDatasetHandlerResponse struct {
	Message string `json:"message"`
	Id string `json:"id"`
	Result string `json:"result"`
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
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	result, err := fs.SaveFileAsDataset(*dataset)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusCreated, result)
}

func getDatasetsHandler(c echo.Context) error {
	result, err := fs.GetDatasets()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, result)
}

func getDatasetByIdHandler(c echo.Context) error {
	id := c.Param("id")

	result, err := fs.GetDatasetById(id)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, result)
}

func updateDatasetHandler(c echo.Context) error {
	dataset := new(Dataset)

	id := c.Param("id")

	if err := c.Bind(dataset); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	result, err := fs.UpdateDataset(id, *dataset)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
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

		return c.JSON(http.StatusOK, &deleteDatasetHandlerResponse{Message: "Dataset deleted", Id:id, Result:result})
	}

	return c.JSON(http.StatusNoContent, &deleteDatasetHandlerResponse{Message: "Missing the dataset id in the request body", Id:id, Result:""})
}
