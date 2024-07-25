package service

import (
	"context"
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
	return service.userRepository.CreateUser(ctx, user)
}
