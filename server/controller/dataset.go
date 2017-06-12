package controller

import (
	"net/http"
	"github.com/labstack/echo"
)

type Book struct {
	ISBN    string   `json:"isbn"`
	Title   string   `json:"title"`
	Authors []string `json:"authors"`
	Price   string   `json:"price"`
}

func GetDataset(c echo.Context) error {
	id := c.Param("id")
	return c.String(http.StatusOK, id)
}

func SaveDataset(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}