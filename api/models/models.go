package models

import (
	"time"
	"gopkg.in/mgo.v2/bson"
)

/////////////////////////////////////////////////////////////////////////////////
// Dataset Model
////////////////////////////////////////////////////////////////////////////////
type Dataset struct {
	Id        bson.ObjectId         `json:"id"`
	CreatedAt time.Time             `json:"created_at"`
	Type      string                `json:"type"`
	Attributes struct {
		Name    string `json:"name,omitempty"`
		Size    int `json:"size,omitempty"`
		RawData string `json:"raw_data,omitempty"`
		Tables  interface{} `json:"tables,omitempty"`
		Link    string `json:"link,omitempty"`
	} `json:"attributes"`
	User struct {
		Id   string `json:"id,omitempty"`
		Link string `json:"link,omitempty"`
	} `json:"user"`
	Link string                         `json:"link,omitempty"`
}

type Datasets []Dataset

/////////////////////////////////////////////////////////////////////////////////
// User Model
////////////////////////////////////////////////////////////////////////////////
type User struct {
	Id        bson.ObjectId         `json:"_id"`
	FirstName string                `json:"first_name,omitempty"`
	LastName  string                `json:"last_name,omitempty"`
	Username  string                `json:"user_name"`
	Email     string                `json:"email"`
	Link      string                `json:"link,omitempty"`
}

type Users []User

func (u User) IsValid() bool {
	if len(u.Username) > 0 {
		return true
	}
	return false
}
