package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"strings"
	"time"
	"wehub/internal/web"
	"wehub/internal/web/middleware"

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
	store := cookie.NewStore([]byte("wehub_custom_secret"))
	server.Use(sessions.Sessions("wehub_ssid", store))
	server.Use(
		middleware.
			InitSignInCheckMiddlewareBuilder().
			IgnorePath("/v1/api/user/sign-up").
			IgnorePath("/v1/api/user/sign-in").
			Build(),
	)

	rootRouter := server.Group("/v1/api")
	web.InitUser(rootRouter, db)

	err := server.Run(":8080")
	if err != nil {
		return
	}
}
