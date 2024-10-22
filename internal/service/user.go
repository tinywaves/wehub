package service

import (
	"context"
	"errors"
	"golang.org/x/crypto/bcrypt"
	"wehub/internal/domain"
	"wehub/internal/repository"
)

var (
	ErrorUserEmailDuplicated   = repository.ErrorUserEmailDuplicated
	ErrorUserNotFound          = repository.ErrorUserNotFound
	ErrorEmailPasswordNotMatch = errors.New("ErrorEmailPasswordNotMatch")
)

type UserService struct {
	userRepository *repository.UserRepository
}

func InitUserService(userRepository *repository.UserRepository) *UserService {
	return &UserService{userRepository: userRepository}
}

func (service *UserService) SignUp(ctx context.Context, user domain.User) error {
	encryptedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(encryptedPassword)
	return service.userRepository.CreateUser(ctx, user)
}

func (service *UserService) SignIn(ctx context.Context, user domain.User) (domain.User, error) {
	foundUser, err := service.userRepository.FindByEmail(ctx, user.Email)
	if err != nil {
		return domain.User{}, err
	}
	if err = bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(user.Password)); err != nil {
		return domain.User{}, ErrorEmailPasswordNotMatch
	}
	return foundUser, nil
}

func (service *UserService) EditUserInfo(ctx context.Context, user domain.User) error {
	return service.userRepository.EditByUserId(ctx, user)
}

func (service *UserService) GetUserInfo(ctx context.Context, userId int64) (domain.User, error) {
	user, err := service.userRepository.FindById(ctx, userId)
	if err != nil {
		return domain.User{}, err
	}
	return domain.User{
		Id:                  user.Id,
		Email:               user.Email,
		Nickname:            user.Nickname,
		Birthday:            user.Birthday,
		PersonalDescription: user.PersonalDescription,
	}, nil
}
