package web

import (
	"errors"
	regexp "github.com/dlclark/regexp2"
	"github.com/gin-gonic/gin"
	"net/http"
	"wehub/internal/domain"
	"wehub/internal/service"
)

// UserHandler Use to handle user related routes
type UserHandler struct {
	userService                   *service.UserService
	compiledEmailRegexpPattern    *regexp.Regexp
	compiledPasswordRegexpPattern *regexp.Regexp
}

func InitUserHandler(userService *service.UserService) *UserHandler {
	const (
		emailRegexpPattern    = `^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$`
		passwordRegexpPattern = `^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$`
	)
	return &UserHandler{
		userService:                   userService,
		compiledEmailRegexpPattern:    regexp.MustCompile(emailRegexpPattern, regexp.None),
		compiledPasswordRegexpPattern: regexp.MustCompile(passwordRegexpPattern, regexp.None),
	}
}

func (handler *UserHandler) RegisterRoutes(rootRouter *gin.RouterGroup) {
	userRouter := rootRouter.Group("/user")
	userRouter.POST("/sign-up", handler.SignUp)
	userRouter.POST("/sign-in", handler.SignIn)
	userRouter.PUT("/:id", handler.Edit)
	userRouter.GET("/:id", handler.Get)
}

func (handler *UserHandler) SignUp(ctx *gin.Context) {
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
	matched, err := handler.compiledEmailRegexpPattern.MatchString(req.Email)
	if err != nil {
		ctx.String(http.StatusOK, "System error")
		return
	}
	if !matched {
		ctx.String(http.StatusOK, "Your email address is not valid")
		return
	}
	matched, err = handler.compiledPasswordRegexpPattern.MatchString(req.Password)
	if err != nil {
		ctx.String(http.StatusOK, "System error")
		return
	}
	if !matched {
		ctx.String(http.StatusOK, "Your password is not valid")
		return
	}

	if err := handler.userService.SignUp(ctx, domain.User{Email: req.Email, Password: req.Password}); err != nil {
		if errors.Is(err, service.ErrorUserEmailDuplicated) {
			ctx.String(http.StatusOK, "Your email address has been used")
			return
		}
		ctx.String(http.StatusOK, "System error")
		return
	}

	ctx.String(http.StatusOK, "SignUp successfully")
	return
}

func (handler *UserHandler) SignIn(ctx *gin.Context) {
	type SignInReq struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	var req SignInReq
	if err := ctx.Bind(&req); err != nil {
		return
	}

	if err := handler.userService.SignIn(ctx, domain.User{Email: req.Email, Password: req.Password}); err != nil {
		if errors.Is(err, service.ErrorUserNotFound) {
			ctx.String(http.StatusOK, "Your email address is not registered")
			return
		}
		if errors.Is(err, service.ErrorEmailPasswordNotMatch) {
			ctx.String(http.StatusOK, "Your email address and password do not match")
			return
		}
		ctx.String(http.StatusOK, "System error")
		return
	}

	ctx.String(http.StatusOK, "SignIn successfully")
	return
}

func (handler *UserHandler) Edit(ctx *gin.Context) {}

func (handler *UserHandler) Get(ctx *gin.Context) {}
