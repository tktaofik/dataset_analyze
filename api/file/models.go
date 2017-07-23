package file

import (
	"time"
	"gopkg.in/mgo.v2/bson"
)

type Columns map[string][]interface{}

type Table struct {
	Rows      []map[string]interface{} `json:"rows,omitempty"`
	Columns   Columns `json:"columns,omitempty"`
	TableName string `json:"tableName,omitempty"`
}

type Tables []Table

type Dataset struct {
	Id         bson.ObjectId        `json:"id,omitempty" bson:"_id,omitempty" `
	CreatedAt  time.Time             `json:"created_at"`
	Type       string                `json:"type"`
	Attributes struct {
		Name    string `json:"name,omitempty"`
		Size    int `json:"size,omitempty"`
		RawData string `json:"raw_data,omitempty"`
		Tables  Tables `json:"tables,omitempty"`

		Link    string `json:"link,omitempty"`
	} `json:"attributes"`
	User       struct {
		Id   string `json:"id,omitempty" bson:"_id,omitempty" `
		Link string `json:"link,omitempty"`
	} `json:"user"`
	Link       string                         `json:"link,omitempty"`
}

type Datasets []Dataset