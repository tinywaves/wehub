package middleware

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
)

type SignInCheckMiddlewareBuilder struct{}

func InitSignInCheckMiddlewareBuilder() *SignInCheckMiddlewareBuilder {
	return &SignInCheckMiddlewareBuilder{}
}

func (s *SignInCheckMiddlewareBuilder) Build() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		if ctx.Request.URL.Path == "/v1/api/user/sign-up" ||
			ctx.Request.URL.Path == "/v1/api/user/sign-in" {
			return
		}
		session := sessions.Default(ctx)
		if session == nil {
			ctx.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		wehubUserId := session.Get("wehub_user_id")
		if wehubUserId == nil {
			ctx.AbortWithStatus(http.StatusUnauthorized)
			return
		}
	}
}
