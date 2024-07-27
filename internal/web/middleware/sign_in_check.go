package middleware

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
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

		now := time.Now().UnixMilli()
		refreshTime := session.Get("wehub_refresh_time")
		if refreshTime == nil {
			session.Set("wehub_user_id", wehubUserId)
			session.Set("wehub_refresh_time", now)
			session.Options(sessions.Options{MaxAge: 7 * 24 * 60 * 60})
			err := session.Save()
			if err != nil {
				ctx.AbortWithStatus(http.StatusInternalServerError)
				return
			}
			return
		}
		refreshTimeInt64, ok := refreshTime.(int64)
		if !ok {
			ctx.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		if now-refreshTimeInt64 > 60*1000 {
			session.Set("wehub_user_id", wehubUserId)
			session.Set("wehub_refresh_time", now)
			session.Options(sessions.Options{MaxAge: 7 * 24 * 60 * 60})
			err := session.Save()
			if err != nil {
				ctx.AbortWithStatus(http.StatusInternalServerError)
				return
			}
			return
		}
		return
	}
}
