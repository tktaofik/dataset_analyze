package controllers

import (
	"net/http"
	"github.com/labstack/echo"
)

func SaveDataset(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}