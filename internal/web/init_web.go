package web

import "github.com/gin-gonic/gin"

func InitUser(rootRouter *gin.RouterGroup) {
	userHandler := InitUserHandler()
	userHandler.RegisterRoutes(rootRouter)
}
