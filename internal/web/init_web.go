package web

import (
	"github.com/gin-gonic/gin"
	"wehub/internal/web/user"
)

func InitWeb() *gin.Engine {
	server := gin.Default()
	mainRouter := server.Group("/v1/api")

	userHandler := user.InitHandler()
	userHandler.RegisterRoutes(mainRouter)

	return server
}
