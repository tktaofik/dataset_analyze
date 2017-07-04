package file

import (
	"testing"
	"encoding/json"

	"github.com/stretchr/testify/assert"
	"gopkg.in/mgo.v2/bson"
)

var (
	dao     = Dao{}
	datasetForDaoTest = new(Dataset)
)

func TestDaoSaveDataset(t *testing.T) {
	if err := json.Unmarshal([]byte(sampleDataset()), &datasetForDaoTest); err != nil {
		t.Error(err.Error())
	}

	expected_res := new(Dataset)

	if err := json.Unmarshal([]byte(sampleDataset()), &expected_res); err != nil {
		t.Error(err.Error())
	}

	result, err := dao.SaveDataset(*datasetForDaoTest)
	if err != nil {
		t.Error(err.Error())
	}

	assert.IsType(t, Dataset{}, result, "Expected data type Dataset")
	assert.Equal(t, expected_res.Attributes.Name, result.Attributes.Name)
	assert.Equal(t, expected_res.Attributes.Size, result.Attributes.Size)
	assert.Equal(t, expected_res.Attributes.RawData, result.Attributes.RawData)
	assert.Equal(t, expected_res.Attributes.Tables, result.Attributes.Tables)
	assert.Equal(t, expected_res.Attributes.Link, result.Attributes.Link)
	assert.Equal(t, expected_res.User.Id, result.User.Id)
	assert.Equal(t, expected_res.User.Link, result.User.Link)
	assert.NotEmpty(t, result.Id)
	assert.NotEmpty(t, result.CreatedAt)

	//Important to save the dataset so we can use it for the corresponding tests
	datasetForDaoTest = &result
}

func TestDaoGetDatasets(t *testing.T) {
	result, err := dao.GetDatasets()

	if err != nil {
		t.Error(err.Error())
	}

	assert.IsType(t, Datasets{}, result, "Expected data type Dataset")
}

func TestDaoGetDatasetById(t *testing.T) {
	result, err := dao.GetDatasetById(bson.ObjectId.Hex(datasetForDaoTest.Id))

	if err != nil {
		t.Error(err.Error())
	}

	assert.IsType(t, Dataset{}, result, "Expected data type Dataset")
}

func TestDaoUpdateDataset(t *testing.T) {
	expected_res := new(Dataset)

	if err := json.Unmarshal([]byte(sampleDataset()), &expected_res); err != nil {
		t.Error(err.Error())
	}

	datasetId := bson.ObjectId.Hex(datasetForDaoTest.Id)

	result, err := dao.UpdateDataset(datasetId, *datasetForDaoTest)

	if err != nil {
		t.Error(err.Error())
	}

	assert.IsType(t, Dataset{}, result, "Expected data type Dataset")
	assert.Equal(t, expected_res.Attributes.Name, result.Attributes.Name)
	assert.Equal(t, expected_res.Attributes.Size, result.Attributes.Size)
	assert.Equal(t, expected_res.Attributes.RawData, result.Attributes.RawData)
	assert.Equal(t, expected_res.Attributes.Tables, result.Attributes.Tables)
	assert.Equal(t, expected_res.Attributes.Link, result.Attributes.Link)
	assert.Equal(t, expected_res.User.Id, result.User.Id)
	assert.Equal(t, expected_res.User.Link, result.User.Link)
	assert.NotEmpty(t, result.Id)
	assert.NotEmpty(t, result.CreatedAt)
}

func TestDaoDeleteDataset(t *testing.T) {
	datasetId := bson.ObjectId.Hex(datasetForDaoTest.Id)

	result, err := dao.DeleteDataset(datasetId)

	if err != nil {
		t.Error(err.Error())
	}

	assert.IsType(t, datasetId, result, "Expected data type Dataset")
}
