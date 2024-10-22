package repository

import (
	"context"
	"time"
	"wehub/internal/domain"
	"wehub/internal/repository/dao"
)

var (
	ErrorUserEmailDuplicated = dao.ErrorUserEmailDuplicated
	ErrorUserNotFound        = dao.ErrorUserNotFound
)

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

func (repository *UserRepository) FindByEmail(ctx context.Context, email string) (domain.User, error) {
	user, err := repository.userDao.QueryByEmail(ctx, email)
	if err != nil {
		return domain.User{}, err
	}
	return domain.User{Id: user.Id, Email: user.Email, Password: user.Password}, nil
}

func (repository *UserRepository) FindById(ctx context.Context, id int64) (domain.User, error) {
	user, err := repository.userDao.QueryById(ctx, id)
	if err != nil {
		return domain.User{}, err
	}
	return domain.User{
		Id:                  user.Id,
		Email:               user.Email,
		Password:            user.Password,
		Nickname:            user.Nickname,
		Birthday:            user.Birthday,
		PersonalDescription: user.PersonalDescription,
	}, nil
}

func (repository *UserRepository) EditByUserId(ctx context.Context, user domain.User) error {
	return repository.userDao.ModifyByUserId(
		ctx,
		dao.User{
			Id:                  user.Id,
			Nickname:            user.Nickname,
			Birthday:            user.Birthday,
			PersonalDescription: user.PersonalDescription,
		},
	)
}
