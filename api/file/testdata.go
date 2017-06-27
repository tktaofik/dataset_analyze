package file

func SampleDataset() string  {
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
