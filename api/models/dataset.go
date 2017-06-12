package models

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

type Dataset struct {
	Id          bson.ObjectId `json:"_id,omitempty" bson:"_id,omitempty"`
	DataSetName string        `json:"dataSetName,omitempty" bson:"dataSetName"`
	CreatedAt   time.Time     `json:"createdAt,omitempty" bson:"createdAt"`
}

func (d Dataset) IsValid() bool {
	if len(d.DataSetName) > 0 {
		return true
	}

	return false
}

type Datasets []Dataset
