package repository

import (
	"context"
	"time"
	"wehub/internal/domain"
	"wehub/internal/repository/dao"
)

var (
	ErrorDuplicateEmail = dao.ErrorDuplicateEmail
	ErrorUserNotFound   = dao.ErrorUserNotFound
)

type UserRepository struct {
	dao *dao.UserDao
}

func InitUserRepository(dao *dao.UserDao) *UserRepository {
	return &UserRepository{dao: dao}
}

func (r *UserRepository) Create(ctx context.Context, u domain.User) error {
	now := time.Now().UnixMilli()
	return r.dao.Insert(ctx, dao.UserModel{
		Email:      u.Email,
		Password:   u.Password,
		CreateTime: now,
		UpdateTime: now,
	})
}

func (r *UserRepository) FindByEmail(ctx context.Context, email string) (domain.User, error) {
	userModel, err := r.dao.QueryByEmail(ctx, email)
	if err != nil {
		return domain.User{}, err
	}
	return domain.User{Email: userModel.Email, Password: userModel.Password}, nil
}
