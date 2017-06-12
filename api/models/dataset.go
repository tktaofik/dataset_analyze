package models

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

type Dataset struct {
	Id        bson.ObjectId `json:"id,omitempty" bson:"id,omitempty"`
	Name      string        `json:"name,omitempty" bson:"name"`
	CreatedAt time.Time     `json:"createdAt,omitempty" bson:"createdAt"`
	Data      string        `json:"data" bson:"data"`
}

func (d Dataset) IsValid() bool {
	if len(d.Name) > 0 {
		return true
	}

	return false
}

type Datasets []Dataset
