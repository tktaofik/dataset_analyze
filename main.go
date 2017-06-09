package main

import (
	"log"
	"runtime"

	"github.com/tktaofik/qlik_analyze_app/server"
	"github.com/tktaofik/qlik_analyze_app/server/route"
)

// *****************************************************************************
// Application Logic
// *****************************************************************************

func init() {
	// Verbose logging with file name and line number
	log.SetFlags(log.Lshortfile)

	// Use all CPU cores
	runtime.GOMAXPROCS(runtime.NumCPU())
}

func main() {

	port := "8081"

	// Start the listener
	server.Run(route.Load(), port)
}