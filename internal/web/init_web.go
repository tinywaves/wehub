package web

import (
	"github.com/gin-gonic/gin"
	"wehub/internal/web/user"
)

func InitWeb() *gin.Engine {
	server := gin.Default()

	userHandler := &user.Handler{}
	userHandler.RegisterRoutes(server)

	return server
}
