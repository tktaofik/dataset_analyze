// Package file provides the use-case of creating a dataset, updating, deleting
// and analyzing a dataset obtained from a file
package file

import (
	"reflect"
)

type Service struct {
	Dao
}

// Extract column values of a dataset table from its rows
func (fs Service) TableColumnsFromRows(table Table) (Columns) {
	columns := make(Columns, 0)
	keys := reflect.ValueOf(table.Rows[0]).MapKeys()

	for _, key := range keys {
		key := key.Interface().(string)
		columns[key] = make([]interface{}, 0)
	}

	for _, row := range table.Rows {
		for _, key := range keys {
			key := key.Interface().(string)
			if row[key] != nil {
				columns[key] = append(columns[key], row[key])
			}
		}
	}

	return columns
}
