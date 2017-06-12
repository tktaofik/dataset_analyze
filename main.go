package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	"github.com/tktaofik/qlik_analyze/api/routes"
)

func main() {
	port := "8081"
	server := echo.New()


	startServer(port, server)
}

func startServer(port string, server *echo.Echo)  {
	server.Use(middleware.Logger())

	routes.Init(server)

	server.Logger.Fatal(server.Start(":" + port))
}