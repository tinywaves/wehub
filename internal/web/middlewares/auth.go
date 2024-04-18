package middlewares

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
)

type AuthMiddleBuilder struct{}

func InitAuthMiddleBuilder() *AuthMiddleBuilder {
	return &AuthMiddleBuilder{}
}

func (a *AuthMiddleBuilder) Build() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		skip := func() bool {
			noNeedToCheckRequestUrls := []string{
				"/v1/api/user/sign-up",
				"/v1/api/user/sign-in",
			}
			for _, url := range noNeedToCheckRequestUrls {
				if ctx.Request.URL.Path == url {
					return true
				}
			}
			return false
		}
		if skip() {
			return
		}
		session := sessions.Default(ctx)
		if session.Get("user_id") == nil {
			ctx.AbortWithStatus(http.StatusUnauthorized)
			return
		}
	}
}
