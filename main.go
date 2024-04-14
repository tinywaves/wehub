package main

import (
	"wehub/internal/web"
)

func main() {
	db := web.InitDb()
	server := web.InitServer()
	mainRouter := server.Group("/v1/api")
	web.InitModules(mainRouter, db)
	_ = server.Run(":8080")
}
