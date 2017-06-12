package main

import (
	"github.com/tktaofik/qlik_analyze/server/routes"
	"github.com/labstack/echo"
)

func main() {
	port := "8081"
	server := echo.New()

	startServer(port, server)
}

func startServer(port string, server *echo.Echo)  {
	server = routes.Setup(server)
	server.Logger.Fatal(server.Start(":" + port))
}