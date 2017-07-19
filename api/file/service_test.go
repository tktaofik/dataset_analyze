package file

import (
	"encoding/json"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("File Service", func() {
	BeforeEach(func() {

	})

	Context("when calling TableColumnsFromRows()", func() {
		It("should return the columns of a table obtained from its rows", func() {
			var (
				dataset Dataset
				fs Service
			)

			if err := json.Unmarshal([]byte(sampleDataset()), &dataset); err != nil {
				panic(err)
			}

			columns := fs.TableColumnsFromRows(dataset.Attributes.Tables[0])

			Ω(columns).Should(HaveLen(4))
			Ω(columns).Should(HaveKey("92"))
			Ω(columns).Should(HaveKey("2006-"))
			Ω(columns).Should(HaveKey("Joachim Löw"))
			Ω(columns["92"]).Should(HaveLen(10))
			Ω(columns["2006-"]).Should(HaveLen(10))
			Ω(columns["Joachim Löw"]).Should(HaveLen(9))
		})
	})
})