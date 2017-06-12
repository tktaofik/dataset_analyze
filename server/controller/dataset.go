package controller

import (
	"net/http"
	"github.com/labstack/echo"
)

func GetDataset(c echo.Context) error {
	id := c.Param("id")
	return c.String(http.StatusOK, id)
}

func SaveDataset(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}