package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	"github.com/tktaofik/qlik_analyze/api/file"
	"github.com/tktaofik/qlik_analyze/api/config"
)

func main() {
	port := "8081"
	server := echo.New()
	db := new(config.DB)

	//Initialize DB
	dbSession, err := db.Dial()
	if err != nil {
		panic(err)
	}

	//server.Use(middleware.Logger())
	server.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE, echo.PATCH},
	}))

	file.Init(server, dbSession)

	server.Logger.Fatal(server.Start(":" + port))
}