package controllers

import (
	"net/http"
	"net/http/httptest"
	"encoding/json"
	"bytes"
	"testing"
	"github.com/labstack/echo"
	"github.com/tktaofik/qlik_analyze/api/models"
	"github.com/stretchr/testify/assert"
	"github.com/tktaofik/qlik_analyze/api/test_data"
)

func TestSaveDataSet(t *testing.T) {
	api := echo.New()
	payload := []byte(test_data.SampleDataset())
	expected_res := &models.Dataset{}

	err := json.Unmarshal([]byte(payload), &expected_res)
	if err != nil {
		t.Error("Unable to marshal TestSaveDataSet expected JSON response'")
	}

	req := httptest.NewRequest(echo.POST, "/", bytes.NewReader(payload))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	res := httptest.NewRecorder()

	c := api.NewContext(req, res)
	c.SetPath("api/datasets/")

	if assert.NoError(t, SaveDataSet(c), "Unable to make SaveDataSet POST request") {
		var res_body models.Dataset
		err := json.Unmarshal(res.Body.Bytes(), &res_body);
		if err != nil {
			t.Error("Unable to SaveDataSet unmarshal JSON response body'")
		}

		assert.Equal(t, http.StatusCreated, res.Code)
		assert.Equal(t, expected_res.Attributes.Name, res_body.Attributes.Name)
		assert.Equal(t, expected_res.Attributes.Size, res_body.Attributes.Size)
		assert.Equal(t, expected_res.Attributes.RawData, res_body.Attributes.RawData)
		assert.Equal(t, expected_res.Attributes.Tables, res_body.Attributes.Tables)
		assert.Equal(t, expected_res.Attributes.Link, res_body.Attributes.Link)
		assert.Equal(t, expected_res.User.Id, res_body.User.Id)
		assert.Equal(t, expected_res.User.Link, res_body.User.Link)
		assert.NotEmpty(t, res_body.Id)
		assert.NotEmpty(t, res_body.CreatedAt)
	}
}


func TestGetUser(t *testing.T) {
	api := echo.New()

	req := httptest.NewRequest(echo.GET, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	res := httptest.NewRecorder()

	c := api.NewContext(req, res)
	c.SetPath("api/datasets/")

	if assert.NoError(t, GetDatasets(c), "Unable to make GetDatasets GET request") {
		var res_body models.Datasets
		err := json.Unmarshal(res.Body.Bytes(), &res_body);
		if err != nil {
			t.Error("Unable to GetDatasets unmarshal JSON response body'")
		}

		assert.Equal(t, http.StatusOK, res.Code, "Expected status code 200")
		assert.IsType(t , models.Datasets{}, res_body, "Expected data type Dataset")
		assert.NotEmpty(t, res_body, "Expected response body to not be empty")
	}
}
