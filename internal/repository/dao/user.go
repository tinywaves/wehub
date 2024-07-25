package dao

import (
	"context"
	"gorm.io/gorm"
)

type UserDao struct {
	db *gorm.DB
}

func InitUserDao(db *gorm.DB) *UserDao {
	return &UserDao{db: db}
}

type User struct {
	Id          int64  `gorm:"primaryKey,autoIncrement"`
	Email       string `gorm:"unique"`
	Password    string
	CreatedTime int64
	UpdatedTime int64
	DeletedTime int64
}

func (dao *UserDao) Insert(ctx context.Context, user User) error {
	return dao.db.WithContext(ctx).Create(&user).Error
}
