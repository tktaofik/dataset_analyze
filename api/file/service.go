// Package file provides the use-case of creating a dataset, updating, deleting
// and analyzing a dataset obtained from a file
package file

import (
	"time"
	"fmt"
	"reflect"

	"gopkg.in/mgo.v2/bson"
)

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

type Table struct {
	Rows      []map[string]interface{} `json:"rows,omitempty"`
	Columns   Columns `json:"columns,omitempty"`
	TableName string `json:"tableName,omitempty"`
}

type Tables []Table

type Column map[string][]interface{}

type Columns []Column

type Service struct {
	Dao
}

// Extract column values of a dataset table from its rows
func (fs Service) DatasetTableColumns(d Dataset) (Dataset) {
	tables := reflect.ValueOf(d.Attributes.Tables)
	for i := 0; i < tables.Len(); i++ {
		columns := make(Columns, 0)
		table := reflect.Value(tables.Index(i)).Interface().(Table)
		keys := reflect.ValueOf(table.Rows[0]).MapKeys()

		for _, key := range keys {
			key := reflect.Value(key).Interface().(string)
			values := make([]interface{}, len(table.Rows))

			for i, row := range table.Rows {
				if row[key] != nil {
					values[i] = row[key]
				}
			}

			c := make(Column)
			c[key] = values

			columns = append(columns, c)
		}

		fmt.Println(columns)
	}
	return d
}
