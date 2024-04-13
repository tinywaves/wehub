package web

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"strings"
	"time"
	"wehub/internal/web/user"
)

func InitWeb() *gin.Engine {
	server := gin.Default()
	server.Use(cors.New(cors.Config{
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return strings.Contains(origin, "http://localhost") || origin == "https://my-website.com"
		},
		MaxAge: 12 * time.Hour,
	}))
	mainRouter := server.Group("/v1/api")

	userHandler := user.InitHandler()
	userHandler.RegisterRoutes(mainRouter)

	return server
}
