package models

import (
	"time"
	"encoding/json"

	"gopkg.in/mgo.v2/bson"
)

type Dataset struct {
	Id        bson.ObjectId        	`json:"id"`
	Name      string                `json:"name"`
	CreatedAt time.Time        	`json:"createdAt"`
	Data      json.RawMessage       `json:"data"`
}

type Datasets []Dataset

func (d Dataset) IsValid() bool {
	if len(d.Name) > 0 {
		return true
	}

	return false
}