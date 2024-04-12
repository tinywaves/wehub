package user

import "github.com/gin-gonic/gin"

type Handler struct{}

func (u *Handler) RegisterRoutes(mainRouter *gin.RouterGroup) {
	routerGroup := mainRouter.Group("/user")
	routerGroup.POST("/sign-up", u.SignUp)
	routerGroup.POST("/sign-in", u.SignIn)
	routerGroup.PUT("/:userId", u.EditUser)
	routerGroup.GET("/:userId", u.GetUser)
}

func (u *Handler) SignUp(ctx *gin.Context) {

}

func (u *Handler) SignIn(ctx *gin.Context) {

}

func (u *Handler) EditUser(ctx *gin.Context) {

}

func (u *Handler) GetUser(ctx *gin.Context) {

}
