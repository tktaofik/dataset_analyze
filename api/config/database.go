package config

import (
	"os"

	"gopkg.in/mgo.v2"
)

type DB struct {
	Session *mgo.Session
}

func (db *DB) DoDial() (s *mgo.Session, err error) {
	return mgo.Dial(DBUrl())
}

func (db *DB) Name() string {
	return "qlik_analyze"
}

func DBUrl() string {
	dbURL := os.Getenv("MONGOHQ_URL")

	if dbURL == "" {
		dbURL = "localhost"
	}

	return dbURL
}
