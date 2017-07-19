package file

import (
	"net/http"

	"github.com/labstack/echo"

	"github.com/tktaofik/qlik_analyze/api/config"
	"gopkg.in/mgo.v2"
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

func dbSession() (s *mgo.Session, err error) {
	db := config.DB{}
	s, err = db.DoDial()
	if err != nil {
		return s, err
	}

	return s, nil
}

func saveFileAsDatasetHandler(c echo.Context) error {
	dataset := new(Dataset)

	if err := c.Bind(dataset); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	s, err := dbSession()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	defer s.Close()

	//Get the column values of each table from its rows
	if (dataset.Attributes.Tables != nil) {
		for i, table := range dataset.Attributes.Tables {
			dataset.Attributes.Tables[i].Columns = fs.TableColumnsFromRows(table)
		}
	}

	result, err := fs.Dao.SaveDataset(*dataset, s)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, result)
}

func getDatasetsHandler(c echo.Context) error {
	s, err := dbSession()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	defer s.Close()

	result, err := fs.Dao.GetDatasets(s)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}

	return c.JSON(http.StatusOK, result)
}

func getDatasetByIdHandler(c echo.Context) error {
	id := c.Param("id")

	s, err := dbSession()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	defer s.Close()

	if len(id) == 24 {
		result, err := fs.Dao.GetDatasetById(id, s)
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

	s, err := dbSession()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	defer s.Close()

	if err := c.Bind(dataset); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	result, err := fs.UpdateDataset(id, *dataset, s)
	if err != nil {
		return echo.NewHTTPError(http.StatusForbidden, err.Error())
	}

	return c.JSON(http.StatusOK, result)
}

func deleteDatasetHandler(c echo.Context) error {
	id := c.Param("id")

	s, err := dbSession()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	defer s.Close()

	if id != "" {
		result, err := fs.DeleteDataset(id, s)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, customResponse{Message: "Dataset deleted", Id: id, Result: result})
	}

	return echo.NewHTTPError(http.StatusInternalServerError, "Missing the dataset id in the request body")
}
