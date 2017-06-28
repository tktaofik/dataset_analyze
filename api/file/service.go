// Package file provides the use-case of saving, updating deleting and analyzing a file
package file

import (
	"net/http"
	"time"
	"gopkg.in/mgo.v2/bson"

	"github.com/labstack/echo"
)


type Service interface {
	SaveFileAsDataset(c echo.Context) (error)
	GetDatasets(c echo.Context) (error)
}

type service struct {
	Dao
}

type Dataset struct {
	Id        bson.ObjectId 		`json:"id,omitempty" bson:"_id,omitempty" `
	CreatedAt time.Time             `json:"created_at"`
	Type      string                `json:"type"`
	Attributes struct {
		Name    string `json:"name,omitempty"`
		Size    int `json:"size,omitempty"`
		RawData string `json:"raw_data,omitempty"`
		Tables  interface{} `json:"tables,omitempty"`
		Link    string `json:"link,omitempty"`
	} `json:"attributes"`
	User struct {
		Id   string `json:"id,omitempty" bson:"_id,omitempty" `
		Link string `json:"link,omitempty"`
	} `json:"user"`
	Link string                         `json:"link,omitempty"`
}

type Datasets []Dataset

func (s service) SaveFileAsDataset(c echo.Context) error {
	dataset := new(Dataset)

	if err := c.Bind(dataset); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Unable to Bind SaveDataSet request body to dataset model struct")
	}

	result, err := s.Dao.SaveFileAsDataset(*dataset); if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Unable to create dataset source")
	}

	return c.JSON(http.StatusCreated, result)
}

func (s service) GetDatasets(c echo.Context) error {
	result, _ := s.Dao.GetDatasets()

	return c.JSON(http.StatusOK, result)
}