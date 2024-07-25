package service

import (
	"context"
	"golang.org/x/crypto/bcrypt"
	"wehub/internal/domain"
	"wehub/internal/repository"
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
