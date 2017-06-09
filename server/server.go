package server

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

// Run starts the HTTP and/or HTTPS listener
func Run(handlers http.Handler, port string) {
	fmt.Println(time.Now().Format("2006-01-02 03:04:05 PM"), "Running server on PORT: " + port)

	// Start the HTTP listener
	log.Fatal(http.ListenAndServe(":" + port, handlers))
}