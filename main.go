package main

import "wehub/internal/web"

func main() {
	server := web.InitWeb()
	_ = server.Run(":8080")
}
