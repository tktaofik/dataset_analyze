package models

import (
	"time"
	"encoding/json"

	"gopkg.in/mgo.v2/bson"
)

type Dataset struct {
	Id        bson.ObjectId        	`json:"id,omitempty" bson:"id,omitempty"`
	Name      string                `json:"name,omitempty" bson:"name"`
	CreatedAt time.Time        	`json:"createdAt,omitempty" bson:"createdAt"`
	Data      json.RawMessage       `json:"data" bson:"data"`
}

func (d Dataset) IsValid() bool {
	if len(d.Name) > 0 {
		return true
	}

	return false
}

type Datasets []Dataset
