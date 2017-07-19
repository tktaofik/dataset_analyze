// Package file provides the use-case of creating a dataset, updating, deleting
// and analyzing a dataset obtained from a file
package file

import (
	"time"
	"reflect"

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

type Service struct {
	Dao
}

// Extract column values of a dataset table from its rows
func (fs Service) TableColumnsFromRows(table Table) (Columns) {
	columns := make(Columns, 0)
	keys := reflect.ValueOf(table.Rows[0]).MapKeys()

	for _, key := range keys {
		key := reflect.Value(key).Interface().(string)
		columns[key] = make([]interface{}, 0)
	}

	for _, row := range table.Rows {
		for _, key := range keys {
			key := reflect.Value(key).Interface().(string)
			if row[key] != nil {
				columns[key] = append(columns[key], row[key])
			}
		}
	}

	return columns
}
