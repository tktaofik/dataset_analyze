// Package file provides the use-case of creating a dataset, updating, deleting
// and analyzing a dataset obtained from a file
package file

import (
	"time"
	"errors"
	"gopkg.in/mgo.v2/bson"
)

type ServiceObj interface {
	SaveFileAsDataset(d Dataset) (Dataset, error)
	GetDatasets() (Datasets, error)
}

type Dataset struct {
	Id        bson.ObjectId        `json:"id,omitempty" bson:"_id,omitempty" `
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

type Service struct {
	Dao
}

func (s Service) SaveFileAsDataset(d Dataset) (Dataset, error) {
	result, err := s.Dao.SaveDataset(d)
	if err != nil {
		return d, errors.New("Unable to save file as a  dataset source")
	}

	return result, nil
}

func (s Service) GetDatasets() (Datasets, error) {
	result, err := s.Dao.GetDatasets()
	if err != nil {
		return result, errors.New("Unable to save file as a  dataset source")
	}

	return result, nil
}
