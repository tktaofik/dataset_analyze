package models

import (
	"time"
	"encoding/json"

	"gopkg.in/mgo.v2/bson"
)

/////////////////
// Dataset Model
////////////////
type Dataset struct {
	Id         bson.ObjectId          `json:"_id"`
	CreatedAt  time.Time             `json:"created_at"`
	Name       string                `json:"name"`
	DataSource json.RawMessage       `json:"data_source"`
	User       struct {
			   Id   string `json:"_id,omitempty"`
			   Link string `json:"link,omitempty"`
		   }
	Link       string                `json:"link,omitempty"`
}

type Datasets []Dataset

func (d Dataset) IsValid() bool {
	if len(d.Name) > 0 {
		return true
	}
	return false
}

/////////////////
// User Model
////////////////
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