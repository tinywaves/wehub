package service

import (
	"context"
	"wehub/internal/domain"
	"wehub/internal/repository"
)

type UserService struct {
	repo *repository.UserRepository
}

func InitUserService(repo *repository.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) SignUp(ctx context.Context, u domain.User) error {
	return s.repo.Create(ctx, u)
}
