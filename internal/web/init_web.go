package web

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"strings"
	"time"
	"wehub/internal/repository"
	"wehub/internal/repository/dao"
	"wehub/internal/service"
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

	db, err := gorm.Open(mysql.Open("root:root@tcp(localhost:13306)/wehub"))
	if err != nil {
		panic(err)
	}
	err = dao.InitTables(db)
	if err != nil {
		panic(err)
	}
	userDao := dao.InitUserDao(db)
	userRepository := repository.InitUserRepository(userDao)
	userService := service.InitUserService(userRepository)
	userHandler := InitUserHandler(userService)
	userHandler.RegisterRoutes(mainRouter)

	return server
}
