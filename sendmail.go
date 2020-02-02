package main

import (
	"github.com/sendgrid/sendgrid-go"
	"os"
	"io/ioutil"
)

const (
	SENDGRID_ENDPOINT = "/v3/mail/send"
	SENDGRID_APIURI = "https://api.sendgrid.com"
	SENDGRID_REQUEST_METHOD = "POST"
)

func SendMail() bool {
	request := sendgrid.GetRequest(os.Getenv("SENDGRID_API_KEY"), SENDGRID_ENDPOINT, SENDGRID_APIURI)
	request.Method = SENDGRID_REQUEST_METHOD
	data, _ := ioutil.ReadFile(SENDGRID_CONFIG_PATH)
	request.Body = data

	_, err := sendgrid.API(request)
	
	return err == nil
}