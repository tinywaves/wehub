package main

import (
	"wehub/internal/web"

	"github.com/gin-gonic/gin"
)

func main() {
	server := gin.Default()
	rootRouter := server.Group("/v1/api")

	userWeb := &web.UserHandler{}
	userWeb.RegisterRoutes(rootRouter)

	err := server.Run(":8080")
	if err != nil {
		return
	}
}
