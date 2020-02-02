package main

import (
	"net/http"
 	"fmt"
	"strconv"
	"html/template"
	"io/ioutil"
	"time"
)

func HandleHtmlRequest(w http.ResponseWriter, r *http.Request) {
	data, err := ioutil.ReadFile("./public" + r.URL.Path + ".html")

	if err != nil {
		tpl.ExecuteTemplate(w, "default.gohtml", template.HTML("<h1>Page Not Found!</h1>"))
	} else {
		tpl.ExecuteTemplate(w, "default.gohtml", template.HTML(data))
	}
}

func HandleJSRequest(w http.ResponseWriter, r *http.Request) {
	data, _ := ioutil.ReadFile("./public" + r.URL.Path)
	fmt.Fprintf(w, string(data))
}

func GetEmailList(w http.ResponseWriter, r *http.Request) {
	data, _ := ioutil.ReadFile(EMAILS_CONFIG_PATH)
	fmt.Fprintf(w, string(data)) 
}

func SetEmailToList(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
	err := ioutil.WriteFile(EMAILS_CONFIG_PATH, reqBody, 0644)
	fmt.Fprintf(w, strconv.FormatBool(err == nil))
}

func GetSendGridConf(w http.ResponseWriter, r *http.Request) {
	data, _ := ioutil.ReadFile(SENDGRID_CONFIG_PATH)
	fmt.Fprintf(w, string(data)) 
}

func SetSendGridConf(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
	err := ioutil.WriteFile(SENDGRID_CONFIG_PATH, reqBody, 0644)
	fmt.Fprintf(w, strconv.FormatBool(err == nil))
}

func IsSenderWorking(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, strconv.FormatBool(IS_SENDER_WORKING))
}

func StartSending(w http.ResponseWriter, r *http.Request) {
	if IS_SENDER_WORKING {
		fmt.Fprintf(w, strconv.FormatBool(false))
	} else {
		IS_SENDER_WORKING = true
		time,_ := strconv.Atoi(r.FormValue("time"))
		c := make(chan int, time)
		go Sender(cap(c), c)
		fmt.Fprintf(w, strconv.FormatBool(true))
	}
}

func StopSending(w http.ResponseWriter, r *http.Request) {
	if !IS_SENDER_WORKING {
		fmt.Fprintf(w, strconv.FormatBool(false))
	} else {
		IS_SENDER_WORKING = false
		fmt.Fprintf(w, strconv.FormatBool(true))
	}
}

func Sender(n int, c chan int) {
	for i := 0; i < 100; i++ {
		if !IS_SENDER_WORKING {
			break
		} else {
			time.Sleep(time.Duration(n)*time.Second)
			SendMail()
		}
	}
	close(c)
}
