package file

import (
	"time"
	"errors"

	"github.com/tktaofik/qlik_analyze/api/config"
	"gopkg.in/mgo.v2/bson"
)

const collection string = "file"

type Dao struct{}

// Get all datasets
func (d Dao) GetDatasets() (Datasets, error) {
	datasets := Datasets{}

	db := config.DB{}
	s, err := db.DoDial()
	if err != nil {
		return datasets, errors.New("There was an error trying to connect with the DB.")
	}

	defer s.Close()

	c := s.DB(db.Name()).C(collection)

	err = c.Find(bson.M{}).All(&datasets)

	if err != nil {
		return datasets, errors.New("There was an error trying to find the datasets.")
	}

	return datasets, err
}

// Save File As Dataset
func (d Dao) SaveFileAsDataset(dataset Dataset) (Dataset, error) {
	dataset.Id = bson.NewObjectId()
	dataset.CreatedAt = time.Now()

	db := config.DB{}
	s, err := db.DoDial()
	if err != nil {
		return dataset, errors.New("There was an error trying to connect to the DB.")
	}

	defer s.Close()

	c := s.DB(db.Name()).C(collection)

	err = c.Insert(dataset)

	if err != nil {
		return dataset, errors.New("There was an error trying to insert a new dataset doc to the DB.")
	}

	return dataset, err
}
