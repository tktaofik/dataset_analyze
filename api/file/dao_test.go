package file

import (
	"testing"
	"encoding/json"

	"github.com/stretchr/testify/assert"
	"gopkg.in/mgo.v2/bson"
)

var (
	dao     = Dao{}
	dataset = new(Dataset)
)

func TestSaveDataset(t *testing.T) {
	if err := json.Unmarshal([]byte(sampleDataset()), &dataset); err != nil {
		t.Error("Unable to Unmarshal sampleDataset to type Dataset")
	}

	expected_res := new(Dataset)

	if err := json.Unmarshal([]byte(sampleDataset()), &expected_res); err != nil {
		t.Error("Unable to marshal TestSaveFileAsDataset expected JSON response'")
	}

	result, err := dao.SaveDataset(*dataset)
	if err != nil {
		t.Error("Failed to get DatasetById")
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
	dataset = &result
}

func TestGetDatasetById(t *testing.T) {

	result, err := dao.GetDatasetById(bson.ObjectId.Hex(dataset.Id))

	if err != nil {
		t.Error("Failed to get DatasetById")
	}

	assert.IsType(t, Dataset{}, result, "Expected data type Dataset")
}
