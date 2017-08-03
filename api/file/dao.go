package file

import (
	"time"
	"fmt"

	"gopkg.in/mgo.v2/bson"

	"github.com/tktaofik/qlik_analyze/api/config"
	"gopkg.in/mgo.v2"
)

var (
	db = new(config.DB)
	collection string = "file"
)

type Dao struct{
	DBSession *mgo.Session
}

func (d Dao) GetDatasets() (Datasets, error) {
	s := d.DBSession.Copy()

	defer s.Close()

	datasets := Datasets{}
	c := s.DB(db.Name()).C(collection)
	err := c.Find(bson.M{}).All(&datasets)

	if err != nil {
		return datasets, err
	}

	return datasets, err
}

func (d Dao) GetDatasetById(id string) (Dataset, error) {
	s := d.DBSession.Copy()


	defer s.Close()

	dataset := Dataset{}

	c := s.DB(db.Name()).C(collection)

	err := c.Find(bson.M{"_id": bson.ObjectIdHex(id)}).One(&dataset)
	if err != nil {
		return Dataset{}, err
	}

	return dataset, err
}

func (d Dao) SaveDataset(dataset Dataset) (Dataset, error) {
	s := d.DBSession.Copy()


	defer s.Close()

	//Get the column values of each table from its rows
	if dataset.Attributes.Tables != nil {
		for i, table := range dataset.Attributes.Tables {
			if len(table.Rows) > 0 {
				dataset.Attributes.Tables[i].Columns = service.TableColumnsFromRows(table)
			}
		}
	}

	dataset.Id = bson.NewObjectId()
	dataset.CreatedAt = time.Now()

	c := s.DB(db.Name()).C(collection)

	err := c.Insert(dataset)
	if err != nil {
		return dataset, err
	}

	return dataset, err
}

func (d Dao) UpdateDataset(id string, dataset Dataset) (Dataset, error) {
	s := d.DBSession.Copy()

	defer s.Close()

	c := s.DB(db.Name()).C(collection)

	err := c.Update(bson.M{"_id": bson.ObjectIdHex(id)}, dataset)
	if err != nil {
		return dataset, err
	}

	return dataset, err
}

func (d Dao) DeleteDataset(id string) (string, error) {
	s := d.DBSession.Copy()

	defer s.Close()

	c := s.DB(db.Name()).C(collection)

	err := c.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		fmt.Println(err)
		return id, err
	}

	return id, err
}
