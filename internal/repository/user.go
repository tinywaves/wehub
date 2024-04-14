package repository

import (
	"context"
	"time"
	"wehub/internal/domain"
	"wehub/internal/repository/dao"
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
