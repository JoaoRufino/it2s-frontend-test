package main

import (
	"fmt"
	"html/template"
	"net/http"
	"os"

	"./models"
)


// vai buscar o template index e apresenta-o
var server models.WS
func index(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles(
		"views/index.html",
		"views/header.html",
		"views/footer.html",
	)
	if err != nil {
		fmt.Fprint(w, err.Error())
	}
	server.Server = os.Getenv("SOCKET")
	server.Port = os.Getenv("S_PORT")
	t.ExecuteTemplate(w, "index", server)
}

func main() {
	fmt.Println("Listening on port :8082...")
	http.Handle("/components/", http.StripPrefix("/components/", http.FileServer(http.Dir("./components/"))))
	http.HandleFunc("/", index)
	http.ListenAndServe(":8082", nil)

}
