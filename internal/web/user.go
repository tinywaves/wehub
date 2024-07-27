package web

import (
	"errors"
	regexp "github.com/dlclark/regexp2"
	"github.com/gin-contrib/sessions"
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
	compiledBirthdayRegexpPattern *regexp.Regexp
}

func InitUserHandler(userService *service.UserService) *UserHandler {
	const (
		emailRegexpPattern    = `^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$`
		passwordRegexpPattern = `^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$`
		birthdayRegexpPattern = `^(19|20)\d\d\.(0[1-9]|1[012])\.(0[1-9]|[12][0-9]|3[01])$`
	)
	return &UserHandler{
		userService:                   userService,
		compiledEmailRegexpPattern:    regexp.MustCompile(emailRegexpPattern, regexp.None),
		compiledPasswordRegexpPattern: regexp.MustCompile(passwordRegexpPattern, regexp.None),
		compiledBirthdayRegexpPattern: regexp.MustCompile(birthdayRegexpPattern, regexp.None),
	}
}

func (handler *UserHandler) RegisterRoutes(rootRouter *gin.RouterGroup) {
	userRouter := rootRouter.Group("/user")
	userRouter.POST("/sign-up", handler.SignUp)
	userRouter.POST("/sign-in", handler.SignIn)
	userRouter.PATCH("/edit", handler.Edit)
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

	user, err := handler.userService.SignIn(ctx, domain.User{Email: req.Email, Password: req.Password})
	if err != nil {
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

	session := sessions.Default(ctx)
	session.Set("wehub_user_id", user.Id)
	err = session.Save()
	if err != nil {
		ctx.String(http.StatusOK, "System error")
		return
	}

	ctx.String(http.StatusOK, "SignIn successfully")
	return
}

func (handler *UserHandler) Edit(ctx *gin.Context) {
	type EditReq struct {
		Nickname            string `json:"nickname"`
		Birthday            string `json:"birthday"`
		PersonalDescription string `json:"personalDescription"`
	}
	var req EditReq
	if err := ctx.Bind(&req); err != nil {
		return
	}

	session := sessions.Default(ctx)
	userId := session.Get("wehub_user_id")

	user := domain.User{Id: userId.(int64)}
	if req.Nickname != "" {
		user.Nickname = req.Nickname
	}
	if req.Birthday != "" {
		matched, err := handler.compiledBirthdayRegexpPattern.MatchString(req.Birthday)
		if err != nil {
			ctx.String(http.StatusOK, "System error")
			return
		}
		if !matched {
			ctx.String(http.StatusOK, "Your birthday format is not valid")
			return
		}
		user.Birthday = req.Birthday
	}
	if req.PersonalDescription != "" {
		user.PersonalDescription = req.PersonalDescription
	}
	if err := handler.userService.Edit(ctx, user); err != nil {
		if errors.Is(err, service.ErrorUserNotFound) {
			ctx.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		ctx.String(http.StatusOK, "System error")
		return
	}

	ctx.String(http.StatusOK, "Edit your profile successfully")
	return
}

func (handler *UserHandler) Get(ctx *gin.Context) {}
