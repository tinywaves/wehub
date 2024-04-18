package web

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"strings"
	"time"
	"wehub/internal/repository"
	"wehub/internal/repository/dao"
	"wehub/internal/service"
	"wehub/internal/web/middlewares"
)

func InitDb() *gorm.DB {
	db, err := gorm.Open(mysql.Open("root:root@tcp(localhost:13306)/wehub"))
	if err != nil {
		panic(err)
	}
	err = dao.InitTables(db)
	if err != nil {
		panic(err)
	}
	return db
}

func InitServer() *gin.Engine {
	server := gin.Default()
	// cors.
	server.Use(cors.New(cors.Config{
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return strings.Contains(origin, "http://localhost") || origin == "https://my-website.com"
		},
		MaxAge: 12 * time.Hour,
	}))
	// session.
	store := cookie.NewStore([]byte("secret"))
	server.Use(sessions.Sessions("wehub_sid", store))
	// check login.
	server.Use(middlewares.InitAuthMiddleBuilder().Build())
	return server
}

func initUser(mainRouter *gin.RouterGroup, db *gorm.DB) {
	userDao := dao.InitUserDao(db)
	userRepository := repository.InitUserRepository(userDao)
	userService := service.InitUserService(userRepository)
	userHandler := InitUserHandler(userService)
	userHandler.RegisterRoutes(mainRouter)
}

func InitModules(mainRouter *gin.RouterGroup, db *gorm.DB) {
	initUser(mainRouter, db)
}
