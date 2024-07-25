package middleware

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
)

type SignInCheckMiddlewareBuilder struct {
	ignorePaths []string
}

func InitSignInCheckMiddlewareBuilder() *SignInCheckMiddlewareBuilder {
	return &SignInCheckMiddlewareBuilder{}
}

func (s *SignInCheckMiddlewareBuilder) IgnorePath(path string) *SignInCheckMiddlewareBuilder {
	s.ignorePaths = append(s.ignorePaths, path)
	return s
}

func (s *SignInCheckMiddlewareBuilder) Build() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		for _, path := range s.ignorePaths {
			if ctx.Request.URL.Path == path {
				return
			}
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
