package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	"github.com/tktaofik/qlik_analyze/api/file"
)

func main() {
	port := "8081"
	server := echo.New()


	startServer(port, server)
}

func startServer(port string, server *echo.Echo)  {
	server.Use(middleware.Logger())
	server.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
	}))

	file.Init(server)

	server.Logger.Fatal(server.Start(":" + port))
}