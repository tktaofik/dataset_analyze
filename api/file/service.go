// Package file provides the use-case of creating a dataset, updating, deleting
// and analyzing a dataset obtained from a file
package file

import (
	"time"
	"fmt"
	"reflect"

	"gopkg.in/mgo.v2/bson"
)

type ServiceObj interface {
	SaveFileAsDataset(d Dataset) (Dataset, error)
	GetDatasets() (Datasets, error)
}

type Dataset struct {
	Id        bson.ObjectId        `json:"id,omitempty" bson:"_id,omitempty" `
	CreatedAt time.Time             `json:"created_at"`
	Type      string                `json:"type"`
	Attributes struct {
		Name    string `json:"name,omitempty"`
		Size    int `json:"size,omitempty"`
		RawData string `json:"raw_data,omitempty"`
		Tables  Tables `json:"tables,omitempty"`

		Link string `json:"link,omitempty"`
	} `json:"attributes"`
	User struct {
		Id   string `json:"id,omitempty" bson:"_id,omitempty" `
		Link string `json:"link,omitempty"`
	} `json:"user"`
	Link string                         `json:"link,omitempty"`
}

type Table struct {
	Rows []map[string]interface{} `json:"rows,omitempty"`
	Columns []struct {
		Name string `json:"name,omitempty"`
		Data []interface{} `json:"columnName,omitempty"`
	} `json:"columns,omitempty"`
	TableName string `json:"tableName,omitempty"`
}

type Datasets []Dataset

type Tables []Table

type Service struct {
	Dao
}

func (fs Service) DatasetTableColumns(d Dataset) (dataset Dataset) {
	tables := reflect.ValueOf(d.Attributes.Tables)

	for i := 0; i < tables.Len(); i++ {
		table := reflect.Value(tables.Index(i)).Interface().(Table)
		for i, row := range table.Rows {
			fmt.Println(i, row)
		}
	}
	return d
}

//b, _ := json.MarshalIndent(tables, "", "  ")
//println(string(b))
