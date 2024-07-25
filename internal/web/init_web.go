package web

import (
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"wehub/internal/repository"
	"wehub/internal/repository/dao"
	"wehub/internal/service"
)

func InitDb() *gorm.DB {
	db, err := gorm.Open(mysql.Open("root:wehub@tcp(localhost:13306)/wehub"))
	if err != nil {
		panic(err)
	}
	if err = dao.InitTables(db); err != nil {
		panic(err)
	}
	return db
}

func InitUser(rootRouter *gin.RouterGroup, db *gorm.DB) {
	userDao := dao.InitUserDao(db)
	userRepository := repository.InitUserRepository(userDao)
	userService := service.InitUserService(userRepository)
	userHandler := InitUserHandler(userService)
	userHandler.RegisterRoutes(rootRouter)
}
