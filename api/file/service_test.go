package file

import (
	"encoding/json"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("File Service", func() {
	BeforeEach(func() {

	})

	Context("when calling DatasetTableColumns()", func() {
		It("should return the dataset with each table columns", func() {
			var (
				dataset Dataset
				fs Service
			)

			if err := json.Unmarshal([]byte(sampleDataset()), &dataset); err != nil {
				panic(err)
			}

			Expect(fs.DatasetTableColumns(dataset)).To(Equal(dataset))
		})
	})
})