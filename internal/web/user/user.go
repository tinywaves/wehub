package user

import (
	regexp "github.com/dlclark/regexp2"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Handler struct {
	compiledEmailRegexp    *regexp.Regexp
	compiledPasswordRegexp *regexp.Regexp
}

func InitHandler() *Handler {
	const (
		emailRegexpPattern    = `^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$`
		passwordRegexpPattern = `^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$`
	)
	return &Handler{
		compiledEmailRegexp:    regexp.MustCompile(emailRegexpPattern, regexp.None),
		compiledPasswordRegexp: regexp.MustCompile(passwordRegexpPattern, regexp.None),
	}
}

func (u *Handler) RegisterRoutes(mainRouter *gin.RouterGroup) {
	routerGroup := mainRouter.Group("/user")
	routerGroup.POST("/sign-up", u.SignUp)
	routerGroup.POST("/sign-in", u.SignIn)
	routerGroup.PUT("/:userId", u.EditUser)
	routerGroup.GET("/:userId", u.GetUser)
}

func (u *Handler) SignUp(ctx *gin.Context) {
	type Req struct {
		Email             string `json:"email"`
		Password          string `json:"password"`
		ConfirmedPassword string `json:"confirmedPassword"`
	}
	var req Req
	if err := ctx.Bind(&req); err != nil {
		// If the request is invalid, return 400 Bad Request by default.
		return
	}
	if req.Password != req.ConfirmedPassword {
		ctx.String(http.StatusOK, "Password and confirmed password are not matched")
		return
	}
	emailMatched, emailMatchedErr := u.compiledEmailRegexp.MatchString(req.Email)
	passwordMatched, passwordMatchedErr := u.compiledPasswordRegexp.MatchString(req.Password)
	if emailMatchedErr != nil || passwordMatchedErr != nil {
		ctx.String(http.StatusOK, "Internal Server Error")
		return
	}
	if !emailMatched {
		ctx.String(http.StatusOK, "Invalid email, please check your email again")
		return
	}
	if !passwordMatched {
		ctx.String(http.StatusOK, "Invalid password, please check your password again")
		return
	}
	ctx.String(http.StatusOK, "Sign up successfully")
}

func (u *Handler) SignIn(ctx *gin.Context) {

}

func (u *Handler) EditUser(ctx *gin.Context) {

}

func (u *Handler) GetUser(ctx *gin.Context) {

}
