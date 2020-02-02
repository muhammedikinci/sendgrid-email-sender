package main

import (
	"net/http"
	"github.com/joho/godotenv"
	"log"
)

const (
	EMAILS_CONFIG_PATH = "./configs/emails.json"
	SENDGRID_CONFIG_PATH = "./configs/sendgrid.json"
)

var IS_SENDER_WORKING = false

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	http.HandleFunc("/", HandleHtmlRequest)
	http.HandleFunc("/js/", HandleJSRequest)
	http.HandleFunc("/getEmailList", GetEmailList)
	http.HandleFunc("/setEmailToList", SetEmailToList)
	http.HandleFunc("/getSendGridConf", GetSendGridConf)
	http.HandleFunc("/setSendGridConf", SetSendGridConf)
	http.HandleFunc("/isSenderWorking", IsSenderWorking)
	http.HandleFunc("/startSending", StartSending)
	http.HandleFunc("/stopSending", StopSending)
	http.ListenAndServe(":3000", nil)
}