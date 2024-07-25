package repository

import (
	"context"
	"time"
	"wehub/internal/domain"
	"wehub/internal/repository/dao"
)

var ErrorUserEmailDuplicated = dao.ErrorUserEmailDuplicated

type UserRepository struct {
	userDao *dao.UserDao
}

func InitUserRepository(userDao *dao.UserDao) *UserRepository {
	return &UserRepository{userDao: userDao}
}

func (repository *UserRepository) CreateUser(ctx context.Context, user domain.User) error {
	now := time.Now().UnixMilli()
	return repository.userDao.Insert(
		ctx,
		dao.User{
			Email:       user.Email,
			Password:    user.Password,
			CreatedTime: now,
			UpdatedTime: now,
		},
	)
}
