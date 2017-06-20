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
)

const mock_dataset = `{
		    "_id": "59440b22f54173614a87bab5",
		    "created_at": "2017-06-16T12:45:22.249840087-04:00",
		    "name": "text.xlx",
		    "data_source": {
			"fileName": "text.xlx",
			"fileSize": 12333,
			"xlsxRawData": {},
			"tables": [
			    {
				"tableName": "order",
				"rows": [
				    {
					"title": "name",
					"dataIndex": 1,
					"key": "name",
					"width": 300
				    },
				    {
					"title": "username",
					"dataIndex": 2,
					"key": "username",
					"width": 300
				    }
				]
			    }
			]
		    },
		    "User": {
			"_id": "d3b3b3b3b3b3",
			"link": "/api/datasets/d3b3b3b3b3b3"
		    }
		}`


func TestSaveDataSet(t *testing.T) {
	api := echo.New()

	payload := []byte(mock_dataset)
	expected_res := &models.Dataset{}
	err := json.Unmarshal([]byte(payload), &expected_res)
	if err != nil {
		t.Error("Unable to marshal expected JSON response'")
	}

	req := httptest.NewRequest(echo.POST, "/api/datasets/", bytes.NewReader(payload))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)

	res := httptest.NewRecorder()
	context := api.NewContext(req, res)

	if assert.NoError(t, SaveDataSet(context), "Unable to make SaveDataSet POST request") {
		var res_body models.Dataset
		err := json.Unmarshal(res.Body.Bytes(), &res_body); if err != nil {
			t.Error("Unable to unmarshal JSON response body'")
		}

		assert.Equal(t, http.StatusCreated, res.Code)
		assert.Equal(t, expected_res.Name, res_body.Name)
		assert.Equal(t, expected_res.User, res_body.User)
		assert.Equal(t, expected_res.Link, res_body.Link)
		assert.NotEmpty(t, res_body.DataSource)
	}
}
/*

func TestGetUser(t *testing.T) {
	// Setup
	e := echo.New()
	req := httptest.NewRequest(echo.GET, "/", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/users/:email")
	c.SetParamNames("email")
	c.SetParamValues("jon@labstack.com")
	h := &handler{mockDB}

	// Assertions
	if assert.NoError(t, h.getUser(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, userJSON, rec.Body.String())
	}
}
*/
