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
	Id         bson.ObjectId        `json:"id,omitempty" bson:"_id,omitempty" `
	CreatedAt  time.Time             `json:"created_at"`
	Type       string                `json:"type"`
	Attributes struct {
			   Name    string `json:"name,omitempty"`
			   Size    int `json:"size,omitempty"`
			   RawData string `json:"raw_data,omitempty"`
			   Tables  interface{} `json:"tables,omitempty"`
			   Link    string `json:"link,omitempty"`
			   //Columns    interface{} `json:"columns,omitempty"`
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

func (fs Service) DatasetTableColumns(d Dataset) (dataset Dataset) {
	dataset = d
	//dataset.Attributes.Columns = d

	tables := reflect.ValueOf(d.Attributes.Tables)

	for i := 0; i < tables.Len(); i++ {
		//type datasetTable interface {}

		//rows := tables.Index(i).rows
		//fmt.Println(tables.Index(0))
		//x := table.MapKeys()
		//
		//fmt.Println(x)
		//fmt.Println(table.tableName)


		//table := table(tables.Index(i))




		type datasetTable struct {
			Rows interface{} `json:"rows,omitempty"`
			TableName interface{} `json:"tableName,omitempty"`
		}

		fmt.Println(tables.Index(i))


		//table := reflect.ValueOf(tables.Index(i))
		//fmt.Println(reflect.TypeOf(tables.Index(i)).Kind())
		//fmt.Println(tables.Index(i))



		//fmt.Println(reflect.ValueOf(table).Kind())

		//for i := 0; i < tables.Len(); i++ {
		//	fmt.Println(tables.Index(0))
		//}
		//
		//if tables.Kind() == reflect.Slice {
		//	for i := 0; i < tables.Len(); i++ {
		//		fmt.Println(tables.Index(0))
		//	}
		//}

		//
		//for key, value := range table.rows {
		//	fmt.Println("Key:", key, "Value:", value)
		//}
	}

	//fmt.Print(tables)

	//b, _ := json.MarshalIndent(tables, "", "  ")
	//println(string(b))
	//
	//dataset = d
	//
	return dataset
}