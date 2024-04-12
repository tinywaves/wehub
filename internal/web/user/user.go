package user

import "github.com/gin-gonic/gin"

type Handler struct{}

func (u *Handler) RegisterRoutes(server *gin.Engine) {
	server.POST("/v1/api/user/sign-up", u.SignUp)
	server.POST("/v1/api/user/sign-in", u.SignIn)
	server.PUT("/v1/api/user/:userId", u.EditProfile)
	server.GET("/v1/api/user/:userId", u.GetProfile)
}

func (u *Handler) SignUp(ctx *gin.Context) {

}

func (u *Handler) SignIn(ctx *gin.Context) {

}

func (u *Handler) EditProfile(ctx *gin.Context) {

}

func (u *Handler) GetProfile(ctx *gin.Context) {

}
