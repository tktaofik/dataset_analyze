package models

type Dataset struct {
	Name  string `json:"name" xml:"name" form:"name" query:"name"`
}
