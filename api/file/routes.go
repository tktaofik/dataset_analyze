package file

import (
	"net/http"

	"github.com/labstack/echo"
)

var (
	s = new(Service)
)

type deleteDatasetHandleResponse struct {
	Message string `json:"message"`
	Id string `json:"id"`
	Result string `json:"result"`
}

func Init(r *echo.Echo) {
	r.GET("/api/v1/datasets/", getDatasetsHandler)
	r.POST("/api/v1/datasets/", saveFileAsDatasetHandler)
	r.PATCH("/api/v1/test/:id", updateDatasetHandler)
	r.DELETE("/api/v1/datasets/:id", deleteDatasetHandler)
}

func saveFileAsDatasetHandler(c echo.Context) error {
	dataset := new(Dataset)

	if err := c.Bind(dataset); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
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

func updateDatasetHandler(c echo.Context) error {
	dataset := new(Dataset)

	id := c.Param("id")

	if err := c.Bind(dataset); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}

	result, err := s.UpdateDataset(id, *dataset)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, result)
}

func deleteDatasetHandler(c echo.Context) error {
	id := c.Param("id")

	if id != "" {
		result, err := s.DeleteDataset(id)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, &deleteDatasetHandleResponse{Message: "Dataset deleted", Id:id, Result:result})
	}

	return c.JSON(http.StatusNoContent, &deleteDatasetHandleResponse{Message: "Missing the dataset id in the request body", Id:id, Result:""})
}
