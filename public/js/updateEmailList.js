var successAlert = $('#successAlert');
var dangerAlert = $('#dangerAlert');
var emailArea = $('#emailList');

successAlert.hide();
dangerAlert.hide();

var xhr = new XMLHttpRequest();
xhr.open('GET', '/getEmailList', true);
xhr.setRequestHeader('Content-type', 'application/json');
xhr.onload = function () {
    try {
        var data = JSON.parse(this.responseText);
        var value = "";

        data["emails"].forEach(email => {
            value += email + "\n";
        });

        emailArea.val(value);

        window.emailListData = value;
    }
    catch(ex) {
        successAlert.hide();
        dangerAlert.show();
        dangerAlert.html("Config parse failed!")
    }
};
xhr.send(null);

$('#updateBtn').on('click', function () {
    var emailList = emailArea.val().split('\n').filter((email) => {
        return email !== "";
    });

    var structure = {
        emails: emailList
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/setEmailToList', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function () {
        try {
            var data = JSON.parse(this.responseText);
    
            if (data) {
                dangerAlert.hide();
                successAlert.show();
            }
        }
        catch(ex) {
            successAlert.hide();
            dangerAlert.show();
            dangerAlert.html("Config parse failed!");
        }
    };
    xhr.send(JSON.stringify(structure,null, 4));
});