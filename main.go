package main

import (
	"github.com/gin-contrib/cors"
	"strings"
	"time"
	"wehub/internal/web"

	"github.com/gin-gonic/gin"
)

func main() {
	db := web.InitDb()
	server := gin.Default()
	server.Use(cors.New(cors.Config{
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			if strings.Contains(origin, "localhost") {
				return true
			}
			return origin == "https://tinywaves.com"
		},
		MaxAge: 12 * time.Hour,
	}))

	rootRouter := server.Group("/v1/api")
	web.InitUser(rootRouter, db)

	err := server.Run(":8080")
	if err != nil {
		return
	}
}
