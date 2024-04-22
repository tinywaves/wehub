package dao

import (
	"context"
	"errors"
	"github.com/go-sql-driver/mysql"
	"gorm.io/gorm"
)

var (
	ErrorDuplicateEmail = errors.New("the changed email address has already been registered")
	ErrorUserNotFound   = gorm.ErrRecordNotFound
)

type UserDao struct {
	db *gorm.DB
}

func InitUserDao(db *gorm.DB) *UserDao {
	return &UserDao{db: db}
}

func (ud *UserDao) Insert(ctx context.Context, um UserModel) error {
	err := ud.db.WithContext(ctx).Create(&um).Error
	var mysqlErr *mysql.MySQLError
	if errors.As(err, &mysqlErr) {
		const uniqueConflictCode uint16 = 1062
		if mysqlErr.Number == uniqueConflictCode {
			return ErrorDuplicateEmail
		}
	}
	return err
}

func (ud *UserDao) QueryByEmail(ctx context.Context, email string) (UserModel, error) {
	var u UserModel
	err := ud.db.WithContext(ctx).Where("email = ?", email).First(&u).Error
	return u, err
}

func (ud *UserDao) QueryById(ctx context.Context, id string) (UserModel, error) {
	var u UserModel
	err := ud.db.WithContext(ctx).Where("id = ?", id).First(&u).Error
	return u, err
}

type UserModel struct {
	Id                  int64  `gorm:"primaryKey,autoIncrement"`
	Email               string `gorm:"unique"`
	Password            string
	Nickname            string
	Birthday            string
	PersonalDescription string
	CreateTime          int64
	UpdateTime          int64
}
