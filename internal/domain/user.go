package domain

type User struct {
	Id                  int64
	Email               string
	Password            string `json:",omitempty"`
	Nickname            string
	Birthday            string
	PersonalDescription string
}
