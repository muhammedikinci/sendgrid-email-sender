# SendGrid Email Sender

Install external packages

```sh
$ go get github.com/sendgrid/sendgrid-go
$ go get github.com/joho/godotenv
```

Create .env file and set your SendGrid Api Key

```sh
$ echo > .env SENDGRID_API_KEY={YOUR_API_KEY}
```

Start and enjoy the UI

```sh
$ go run ./
```