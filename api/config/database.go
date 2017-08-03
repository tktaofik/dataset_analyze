package config

import (
	"os"

	"gopkg.in/mgo.v2"
)

type DB struct {
	//Session *mgo.Session
}

func (db *DB) Name() string {
	return "qlik_analyze"
}

func (db *DB) Dial() (s *mgo.Session, err error) {
	s, err = mgo.Dial(db.Url())
	if err != nil {
		return s, err
	}

	return s, nil
}

func (db *DB) Url() string {
	dbURL := os.Getenv("MONGOHQ_URL")

	if dbURL == "" {
		dbURL = "localhost"
	}

	return dbURL
}
