package file

import (
	"time"
	"errors"

	"github.com/tktaofik/qlik_analyze/api/config"
	"gopkg.in/mgo.v2/bson"
	"fmt"
)

const collection string = "file"

type Dao struct{}

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

func (d Dao) GetDatasetById(id string) (Dataset, error) {
	dataset := Dataset{}

	db := config.DB{}
	s, err := db.DoDial()
	if err != nil {
		return dataset, errors.New("There was an error trying to connect with the DB.")
	}

	defer s.Close()

	c := s.DB(db.Name()).C(collection)

	if err := c.Find(bson.M{"_id": bson.ObjectIdHex(id)}).One(&dataset); err!= nil {
		return dataset, errors.New("There was an error trying to find Dataset with Id.")
	}

	return dataset, err
}

func (d Dao) SaveDataset(dataset Dataset) (Dataset, error) {
	dataset.Id = bson.NewObjectId()
	dataset.CreatedAt = time.Now()

	db := config.DB{}
	s, err := db.DoDial()
	if err != nil {
		return dataset, errors.New("There was an error trying to connect to the DB.")
	}

	defer s.Close()

	c := s.DB(db.Name()).C(collection)

	if err = c.Insert(dataset); err != nil {
		return dataset, errors.New("There was an error trying to insert a new dataset to the DB.")
	}

	return dataset, err
}

func (d Dao) UpdateDataset(id string, dataset Dataset) (Dataset, error) {
	db := config.DB{}
	s, err := db.DoDial()
	if err != nil {
		return dataset, errors.New("There was an error trying to connect to the DB.")
	}

	defer s.Close()

	c := s.DB(db.Name()).C(collection)

	if err := c.Update(bson.M{"_id": bson.ObjectIdHex(id)},dataset); err != nil {
		return dataset, errors.New("There was an error trying to update dataset in the DB.")
	}

	if err != nil {
		return dataset, errors.New("There was an error trying to update  dataset in the DB.")
	}

	return dataset, err
}

func (d Dao) DeleteDataset(id string) (string, error) {
	db := config.DB{}
	s, err := db.DoDial()
	if err != nil {
		return id, errors.New("There was an error trying to connect to the DB.")
	}

	defer s.Close()

	c := s.DB(db.Name()).C(collection)
	if err := c.Remove(bson.M{"_id": bson.ObjectIdHex(id)}); err != nil {
		fmt.Println(err)
		return id, errors.New("There was an error trying to delete dataset in the DB.")
	}

	if err != nil {
		return id, errors.New("There was an error trying to remove dataset in the DB.")
	}

	return id, err
}
