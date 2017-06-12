package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	"github.com/tktaofik/qlik_analyze/server/routes"
	"github.com/tktaofik/qlik_analyze/server/config"

)

func main() {
	port := "8081"
	server := echo.New()

	dbSession = config.MongoDb()

	startServer(port, server)
}

func startServer(port string, server *echo.Echo)  {
	server.Use(middleware.Logger())
	server = routes.Setup(server)
	server.Logger.Fatal(server.Start(":" + port))
}