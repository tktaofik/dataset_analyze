package file

import (
	"time"

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
		return datasets, err
	}

	defer s.Close()

	c := s.DB(db.Name()).C(collection)

	err = c.Find(bson.M{}).All(&datasets)

	if err != nil {
		return datasets, err
	}

	return datasets, err
}

func (d Dao) GetDatasetById(id string) (Dataset, error) {
	dataset := Dataset{}

	db := config.DB{}
	s, err := db.DoDial()
	if err != nil {
		return dataset, err
	}

	defer s.Close()

	c := s.DB(db.Name()).C(collection)

	if err := c.Find(bson.M{"_id": bson.ObjectIdHex(id)}).One(&dataset); err!= nil {
		return dataset, err
	}

	return dataset, err
}

func (d Dao) SaveDataset(dataset Dataset) (Dataset, error) {
	dataset.Id = bson.NewObjectId()
	dataset.CreatedAt = time.Now()

	db := config.DB{}
	s, err := db.DoDial()
	if err != nil {
		return dataset, err
	}

	defer s.Close()

	c := s.DB(db.Name()).C(collection)

	if err = c.Insert(dataset); err != nil {
		return dataset, err
	}

	return dataset, err
}

func (d Dao) UpdateDataset(id string, dataset Dataset) (Dataset, error) {
	db := config.DB{}
	s, err := db.DoDial()
	if err != nil {
		return dataset, err
	}

	defer s.Close()

	c := s.DB(db.Name()).C(collection)

	if err := c.Update(bson.M{"_id": bson.ObjectIdHex(id)},dataset); err != nil {
		return dataset, err
	}

	if err != nil {
		return dataset, err
	}

	return dataset, err
}

func (d Dao) DeleteDataset(id string) (string, error) {
	db := config.DB{}
	s, err := db.DoDial()
	if err != nil {
		return id, err
	}

	defer s.Close()

	c := s.DB(db.Name()).C(collection)
	if err := c.Remove(bson.M{"_id": bson.ObjectIdHex(id)}); err != nil {
		fmt.Println(err)
		return id, err
	}

	if err != nil {
		return id, err
	}

	return id, err
}
