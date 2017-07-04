package file

import (
	"net/http"
	"net/http/httptest"
	"encoding/json"
	"testing"
	"strings"
	"bytes"

	"gopkg.in/mgo.v2/bson"
	"github.com/labstack/echo"
	"github.com/stretchr/testify/assert"
)

var (
	api = echo.New()
	datasetForRouteTest = new(Dataset)
)

func TestSaveFileAsDatasetHandler(t *testing.T) {
	res := httptest.NewRecorder()

	req := httptest.NewRequest(echo.POST, "/", strings.NewReader(sampleDataset()))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)

	c := api.NewContext(req, res)
	c.SetPath("api/v1/dataset/")

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

		//Important to save the dataset so we can use it for the corresponding tests
		datasetForRouteTest = resBody
	}
}

func TestGetDatasetsHandler(t *testing.T) {
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

func TestUpdateDatasetHandler(t *testing.T) {
	datasetForRouteTest.Attributes.Name = "tk is king"

	body, err := json.Marshal(datasetForRouteTest)
	if err != nil {
		t.Error("Unable to marshal TestSaveFileAsDataset expected JSON response'")
	}

	res := httptest.NewRecorder()

	req := httptest.NewRequest(echo.PATCH, "/", bytes.NewReader(body))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)

	datasetId := bson.ObjectId.Hex(datasetForRouteTest.Id)

	c := api.NewContext(req, res)
	c.SetPath("api/v1/dataset/:id")
	c.SetParamNames("id")
	c.SetParamValues(datasetId)

	if assert.NoError(t, updateDatasetHandler(c), "getDatasetsHandler Failing") {
		resBody, expected_res := new(Dataset), new(Dataset)

		if err := json.Unmarshal([]byte(sampleDataset()), &expected_res); err != nil {
			t.Error("Unable to marshal TestSaveFileAsDataset expected JSON response'")
		}

		if err := json.Unmarshal(res.Body.Bytes(), &resBody); err != nil {
			t.Error("Unable to unmarshal TestSaveFileAsDataset JSON response body to type Dataset type")
		}

		assert.Equal(t, http.StatusOK, res.Code)
		assert.Equal(t, "tk is king", resBody.Attributes.Name)
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

func TestGetDatasetByIdHandler(t *testing.T) {
	res := httptest.NewRecorder()

	req := httptest.NewRequest(echo.GET, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)

	datasetId := bson.ObjectId.Hex(datasetForRouteTest.Id)

	c := api.NewContext(req, res)
	c.SetPath("api/v1/dataset/:id")
	c.SetParamNames("id")
	c.SetParamValues(datasetId)

	if assert.NoError(t, getDatasetByIdHandler(c), "saveFileAsDatasetHandler Failing") {
		resBody, expected_res := new(Dataset), new(Dataset)

		if err := json.Unmarshal([]byte(sampleDataset()), &expected_res); err != nil {
			t.Error("Unable to marshal TestSaveFileAsDataset expected JSON response'")
		}

		if err := json.Unmarshal(res.Body.Bytes(), &resBody); err != nil {
			t.Error("Unable to unmarshal TestSaveFileAsDataset JSON response body to type Dataset type")
		}

		assert.Equal(t, http.StatusOK, res.Code)
		assert.Equal(t, "tk is king", resBody.Attributes.Name)
		assert.Equal(t, expected_res.Attributes.Size, resBody.Attributes.Size)
		assert.Equal(t, expected_res.Attributes.RawData, resBody.Attributes.RawData)
		assert.Equal(t, expected_res.Attributes.Tables, resBody.Attributes.Tables)
		assert.Equal(t, expected_res.Attributes.Link, resBody.Attributes.Link)
		assert.Equal(t, expected_res.User.Id, resBody.User.Id)
		assert.Equal(t, expected_res.User.Link, resBody.User.Link)
		assert.NotEmpty(t, resBody.Id)
		assert.NotEmpty(t, resBody.CreatedAt)

		//Important to save the dataset so we can use it for the corresponding tests
		datasetForRouteTest = resBody
	}
}

func TestGetDatasetWithInvalidId(t *testing.T) {
	res := httptest.NewRecorder()

	req := httptest.NewRequest(echo.GET, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)

	c := api.NewContext(req, res)
	c.SetPath("api/v1/dataset/:id")
	c.SetParamNames("id")
	c.SetParamValues("594fcf6e4162400ea6dc")

	err := getDatasetByIdHandler(c)

	if assert.NotNil(t,err) {
		resBody, ok := err.(*echo.HTTPError)
		if ok {
			assert.Equal(t, http.StatusNotFound, resBody.Code)
			assert.Equal(t, "Invalid id length, length should be 24", resBody.Message)
		}
	}
}

func TestDeleteDatasetHandler(t *testing.T) {
	res := httptest.NewRecorder()

	req := httptest.NewRequest(echo.DELETE, "/", nil)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)

	datasetId := bson.ObjectId.Hex(datasetForRouteTest.Id)

	c := api.NewContext(req, res)
	c.SetPath("api/v1/dataset/:id")
	c.SetParamNames("id")
	c.SetParamValues(datasetId)

	if assert.NoError(t, deleteDatasetHandler(c), "getDatasetsHandler Failing") {
		type response struct {
			Message string `json:"message"`
			Id string `json:"id"`
			Result string `json:"result"`
		}
		resBody := new(response)

		if err := json.Unmarshal(res.Body.Bytes(), &resBody); err != nil {
			t.Error("Unable to unmarshal TestSaveFileAsDataset JSON response body to type Dataset type")
		}

		assert.Equal(t, http.StatusOK, res.Code)
	}
}

func sampleDataset() string {
	return `{
   "type":"dataset",
   "attributes":{
      "name":"jason",
      "size":30003,
      "rawdata":"",
      "tables":[
         {
            "rows":[
               {
                  "92":"60",
                  "2006-":"2004–2006",
                  "Joachim Löw":"Jürgen Klinsmann",
                  "key":"1"
               },
               {
                  "92":"31",
                  "2006-":"2000–2004",
                  "Joachim Löw":"Rudi Völler",
                  "key":"2"
               },
               {
                  "92":"22",
                  "2006-":"1998–2000",
                  "Joachim Löw":"Erich Ribbeck",
                  "key":"3"
               },
               {
                  "92":"25",
                  "2006-":"1990–1998",
                  "Joachim Löw":"Berti Vogts",
                  "key":"4"
               },
               {
                  "92":"4",
                  "2006-":"1984–1990",
                  "Joachim Löw":"Franz Beckenbauer",
                  "key":"5"
               },
               {
                  "92":"2",
                  "2006-":"1978–1984",
                  "Joachim Löw":"Jupp Derwall",
                  "key":"6"
               },
               {
                  "92":"55",
                  "2006-":"1964–1978",
                  "Joachim Löw":"Helmut Schön",
                  "key":"7"
               },
               {
                  "92":"7",
                  "2006-":"1950–1964",
                  "Joachim Löw":"Sepp Herberger*",
                  "key":"8"
               },
               {
                  "92":"88",
                  "2006-":"1938–1942",
                  "key":"9"
               },
               {
                  "92":"36",
                  "2006-":"1923–1938",
                  "Joachim Löw":"Otto Nerz",
                  "key":"10"
               }
            ],
            "tableName":"Data"
         },
         {
            "rows":[
               {
                  "Ausw":"57",
                  "G":"135",
                  "Heim":"78",
                  "Jahre":"21",
                  "TD-Verhältnis":"5460:3997",
                  "Team":"Munich Cowboys",
                  "U":"6",
                  "V":"92",
                  "key":"1"
               },
               {
                  "Ausw":"10",
                  "G":"25",
                  "Heim":"15",
                  "Jahre":"8",
                  "TD-Verhältnis":"1752:2604",
                  "Team":"Stuttgart Scorpions",
                  "U":"2",
                  "V":"60",
                  "key":"2"
               },
               {
                  "Ausw":"5",
                  "G":"12",
                  "Heim":"7",
                  "Jahre":"4(5)[2]",
                  "TD-Verhältnis":"677:1634",
                  "Team":"Franken Knights (N)",
                  "U":"2",
                  "V":"31",
                  "key":"3"
               },
               {
                  "Ausw":"8",
                  "G":"19",
                  "Heim":"11",
                  "Jahre":"4",
                  "TD-Verhältnis":"1025:1063",
                  "Team":"Rüsselsheim Razorbacks",
                  "U":"1",
                  "V":"22",
                  "key":"4"
               },
               {
                  "Ausw":"4",
                  "G":"8",
                  "Heim":"4",
                  "Jahre":"3",
                  "TD-Verhältnis":"637:1104",
                  "Team":"Landsberg Express",
                  "U":"1",
                  "V":"25",
                  "key":"5"
               },
               {
                  "Ausw":"4",
                  "G":"8",
                  "Heim":"4",
                  "Jahre":"1",
                  "TD-Verhältnis":"446:195",
                  "Team":"Aschaffenburg Stallions",
                  "U":"0",
                  "V":"4",
                  "key":"6"
               }
            ],
            "tableName":"Team2"
         },
         {
            "rows":[
               {
                  "English":"one",
                  "German":"eins",
                  "Pronunciation":"(EYNS)",
                  "key":"1"
               },
               {
                  "English":"two",
                  "German":"zwei",
                  "Pronunciation":"(TSVY)",
                  "key":"2"
               },
               {
                  "English":"three",
                  "German":"drei",
                  "Pronunciation":"(DRY)",
                  "key":"3"
               },
               {
                  "English":"four",
                  "German":"vier",
                  "Pronunciation":"(FEAR)",
                  "key":"4"
               },
               {
                  "English":"five",
                  "German":"fünf",
                  "Pronunciation":"(FUENF)",
                  "key":"5"
               },
               {
                  "English":"six",
                  "German":"sechs",
                  "Pronunciation":"(ZEKS)",
                  "key":"6"
               },
               {
                  "English":"seven",
                  "German":"sieben",
                  "Pronunciation":"(ZEEBEN)",
                  "key":"7"
               },
               {
                  "English":"eight",
                  "German":"acht",
                  "Pronunciation":"(AKT)",
                  "key":"8"
               },
               {
                  "English":"nine",
                  "German":"neun",
                  "Pronunciation":"(NOIN)",
                  "key":"9"
               },
               {
                  "English":"ten",
                  "German":"zehn",
                  "Pronunciation":"(TSEHN)",
                  "key":"10"
               },
               {
                  "English":"eleven",
                  "German":"elf",
                  "Pronunciation":"(ELF)",
                  "key":"11"
               },
               {
                  "English":"twelve",
                  "German":"zwölf",
                  "Pronunciation":"(TSVOLF)",
                  "key":"12"
               },
               {
                  "English":"thirteen",
                  "German":"dreizehn",
                  "Pronunciation":"(DRYZAYNN)",
                  "key":"13"
               },
               {
                  "English":"fourteen",
                  "German":"vierzehn",
                  "Pronunciation":"(VEERTZAYNN)",
                  "key":"14"
               },
               {
                  "English":"fifteen",
                  "German":"fünfzehn",
                  "Pronunciation":"(FUENFZAYNN)",
                  "key":"15"
               },
               {
                  "English":"sixteen",
                  "German":"sechzehn",
                  "Pronunciation":"(ZEKSZAYNN)",
                  "key":"16"
               },
               {
                  "English":"seventeen",
                  "German":"siebzehn",
                  "Pronunciation":"(SEEBZAYNN)",
                  "key":"17"
               },
               {
                  "English":"eighteen",
                  "German":"achtzehn",
                  "Pronunciation":"(AHHCTZAYNN)",
                  "key":"18"
               },
               {
                  "English":"nineteen",
                  "German":"neunzehn",
                  "Pronunciation":"(NOINZAYNN)",
                  "key":"19"
               },
               {
                  "English":"twenty",
                  "German":"zwanzig",
                  "Pronunciation":"(ZVANZIG)",
                  "key":"20"
               }
            ],
            "tableName":"Counting"
         }
      ],
      "link":""
   },
   "user":{
      "id":"d3b3b3b3b3b3",
      "link":"/api/datasets/d3b3b3b3b3b3"
   }
}`

}