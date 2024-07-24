package web

import (
	regexp "github.com/dlclark/regexp2"
	"github.com/gin-gonic/gin"
	"net/http"
)

// UserHandler Use to handle user related routes
type UserHandler struct {
	compiledEmailRegexpPattern    *regexp.Regexp
	compiledPasswordRegexpPattern *regexp.Regexp
}

func InitUserHandler() *UserHandler {
	const (
		emailRegexpPattern    = `^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$`
		passwordRegexpPattern = `^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$`
	)
	return &UserHandler{
		compiledEmailRegexpPattern:    regexp.MustCompile(emailRegexpPattern, regexp.None),
		compiledPasswordRegexpPattern: regexp.MustCompile(passwordRegexpPattern, regexp.None),
	}
}

func (u *UserHandler) RegisterRoutes(rootRouter *gin.RouterGroup) {
	userRouter := rootRouter.Group("/user")
	userRouter.POST("/sign-up", u.SignUp)
	userRouter.POST("/sign-in", u.SignIn)
	userRouter.PUT("/:id", u.Edit)
	userRouter.GET("/:id", u.Get)
}

func (u *UserHandler) SignUp(ctx *gin.Context) {
	type SignUpReq struct {
		Email             string `json:"email"`
		Password          string `json:"password"`
		ConfirmedPassword string `json:"confirmedPassword"`
	}
	var req SignUpReq
	if err := ctx.Bind(&req); err != nil {
		return
	}

	if req.Password != req.ConfirmedPassword {
		ctx.String(http.StatusOK, "Your password and confirmed password do not match")
		return
	}
	matched, err := u.compiledEmailRegexpPattern.MatchString(req.Email)
	if err != nil {
		ctx.String(http.StatusOK, "System error")
		return
	}
	if !matched {
		ctx.String(http.StatusOK, "Your email address is not valid")
	}
	matched, err = u.compiledPasswordRegexpPattern.MatchString(req.Password)
	if err != nil {
		ctx.String(http.StatusOK, "System error")
		return
	}
	if !matched {
		ctx.String(http.StatusOK, "Your password is not valid")
	}
}

func (u *UserHandler) SignIn(ctx *gin.Context) {}

func (u *UserHandler) Edit(ctx *gin.Context) {}

func (u *UserHandler) Get(ctx *gin.Context) {}
