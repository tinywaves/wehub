package web

import "github.com/gin-gonic/gin"

// UserHandler Use to handle user related routes
type UserHandler struct{}

func (u *UserHandler) RegisterRoutes(rootRouter *gin.RouterGroup) {
	userRouter := rootRouter.Group("/user")
	userRouter.POST("/user/sign-up", u.SignUp)
	userRouter.POST("/user/sign-in", u.SignIn)
	userRouter.PUT("/user/:id", u.Edit)
	userRouter.GET("/user/:id", u.Get)
}

func (u *UserHandler) SignUp(ctx *gin.Context) {}

func (u *UserHandler) SignIn(ctx *gin.Context) {}

func (u *UserHandler) Edit(ctx *gin.Context) {}

func (u *UserHandler) Get(ctx *gin.Context) {}
