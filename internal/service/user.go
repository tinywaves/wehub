package service

import (
	"context"
	"errors"
	"golang.org/x/crypto/bcrypt"
	"wehub/internal/domain"
	"wehub/internal/repository"
)

var (
	ErrorDuplicateEmail          = repository.ErrorDuplicateEmail
	ErrorEmailPasswordNotMatched = errors.New("your email and password is not matched")
	ErrorUserNotFound            = repository.ErrorUserNotFound
)

type UserService struct {
	repo *repository.UserRepository
}

func InitUserService(repo *repository.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) SignUp(ctx context.Context, u domain.User) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hash)
	return s.repo.Create(ctx, u)
}

func (s *UserService) SignIn(ctx context.Context, u domain.User) (domain.User, error) {
	user, err := s.repo.FindByEmail(ctx, u.Email)
	if err != nil {
		return domain.User{}, err
	}
	if err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(u.Password)); err != nil {
		return domain.User{}, ErrorEmailPasswordNotMatched
	}
	return user, nil
}

func (s *UserService) GetUser(ctx context.Context, userId string) (domain.User, error) {
	user, err := s.repo.FindById(ctx, userId)
	return user, err
}
