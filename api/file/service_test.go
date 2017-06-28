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
)

func TestSaveFileAsDataset(t *testing.T) {
	res := httptest.NewRecorder()

	req := httptest.NewRequest(echo.POST, "/", strings.NewReader(sampleDataset()))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)

	c := api.NewContext(req, res)
	c.SetPath("api/v1/datasets/")

	if assert.NoError(t, saveFileAsDatasetHandler(c), "saveFileAsDatasetHandler Failing") {
		resBody, expected_res := new(Dataset), new(Dataset)

		if err := json.Unmarshal([]byte(sampleDataset()), &expected_res); err != nil {
			t.Error("Unable to marshal TestSaveFileAsDataset expected JSON response'")
		}

		if err := json.Unmarshal(res.Body.Bytes(), &resBody); err != nil {
			t.Error("Unable to unmarshal TestSaveFileAsDataset JSON response body to type Dataset type")
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
	res := httptest.NewRecorder()

	req := httptest.NewRequest(echo.GET, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)

	c := api.NewContext(req, res)
	c.SetPath("api/v1/datasets/")

	if assert.NoError(t, getDatasetsHandler(c), "getDatasetsHandler Failing") {
		resBody, expected_res := new(Datasets), new(Datasets)

		if err := json.Unmarshal(res.Body.Bytes(), &resBody); err != nil {
			t.Error("Unable to unmarshal TestGetDatasets JSON response body'")
		}

		assert.Equal(t, http.StatusOK, res.Code, "Expected status code 200")
		assert.IsType(t, expected_res, resBody, "Expected data type Dataset")
		assert.NotEmpty(t, resBody, "Expected response body to not be empty")
	}
}

func sampleDataset() string {
	return `{
  "type": "dataset",
  "attributes": {
  	"name":"text.xlx",
  	"size":12333,
  	"rawData":{},
  	"tables":[{
  		"tableName":"order",
  		"rows":[{
  			"title":"name",
  			"dataIndex":1,
  			"key":"name",
  			"width":300
  		},
  		{
  			"title":"username",
  			"dataIndex":2,
  			"key":"username",
  			"width":300
  		}]
  	}]},
  "user":{
  	"id":"d3b3b3b3b3b3",
  	"link":"/api/datasets/d3b3b3b3b3b3"
  	}
}`

}
