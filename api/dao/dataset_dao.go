package dao

import (
	"time"
	"errors"

	"github.com/tktaofik/qlik_analyze/api/config"
	model "github.com/tktaofik/qlik_analyze/api/models"
	"gopkg.in/mgo.v2/bson"
)

const collection string = "datasets"

// Get all the datasets
func GetDatasets() (model.Datasets, error) {
	db := config.DB{}
	datasets := model.Datasets{}

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

// Create a new dataset
func NewDataSet(dataset model.Dataset) (model.Dataset, error) {
	db := config.DB{}
	dataset.Id = bson.NewObjectId()
	dataset.CreatedAt = time.Now()

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