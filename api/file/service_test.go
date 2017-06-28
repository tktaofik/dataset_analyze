package file

import (
	"net/http"
	"net/http/httptest"
	"encoding/json"
	"testing"
	"strings"

	"github.com/labstack/echo"
	"github.com/stretchr/testify/assert"
)

var (
	api = echo.New()
	s   = new(service)
)

func TestSaveFileAsDataset(t *testing.T) {
	expected_res := &Dataset{}
	err := json.Unmarshal([]byte(SampleDataset()), &expected_res)
	if err != nil {
		t.Error("Unable to marshal TestSaveDataSet expected JSON response'")
	}

	req := httptest.NewRequest(echo.POST, "/", strings.NewReader(SampleDataset()))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	res := httptest.NewRecorder()

	c := api.NewContext(req, res)
	c.SetPath("api/v1/datasets/")

	if assert.NoError(t, s.SaveFileAsDataset(c), "Unable to make SaveDataSet POST request") {
		var resBody Dataset
		err := json.Unmarshal(res.Body.Bytes(), &resBody)
		if err != nil {
			t.Error("Unable to SaveDataSet unmarshal JSON response body'")
		}

		assert.Equal(t, http.StatusCreated, res.Code)
		assert.Equal(t, expected_res.Attributes.Name, resBody.Attributes.Name)
		assert.Equal(t, expected_res.Attributes.Size, resBody.Attributes.Size)
		assert.Equal(t, expected_res.Attributes.RawData, resBody.Attributes.RawData)
		assert.Equal(t, expected_res.Attributes.Tables, resBody.Attributes.Tables)
		assert.Equal(t, expected_res.Attributes.Link, resBody.Attributes.Link)
		assert.Equal(t, expected_res.User.Id, resBody.User.Id)
		assert.Equal(t, expected_res.User.Link, resBody.User.Link)
		assert.NotEmpty(t, resBody.Id)
		assert.NotEmpty(t, resBody.CreatedAt)
	}
}

func TestGetDatasets(t *testing.T) {
	req := httptest.NewRequest(echo.GET, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	res := httptest.NewRecorder()

	c := api.NewContext(req, res)
	c.SetPath("api/v1/datasets/")

	if assert.NoError(t, s.GetDatasets(c), "Unable to make GetDatasets GET request") {
		var resBody Datasets
		err := json.Unmarshal(res.Body.Bytes(), &resBody)
		if err != nil {
			t.Error("Unable to GetDatasets unmarshal JSON response body'")
		}

		assert.Equal(t, http.StatusOK, res.Code, "Expected status code 200")
		assert.IsType(t, Datasets{}, resBody, "Expected data type Dataset")
		assert.NotEmpty(t, resBody, "Expected response body to not be empty")
	}
}
