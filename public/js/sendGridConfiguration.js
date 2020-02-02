var templateid = $('#templateid');
var fromemail = $('#fromemail');
var toemail = $('#toemail');
var subject = $('#subject');
var passdata = $('#passdata');
var successAlert = $('#successAlert');
var dangerAlert = $('#dangerAlert');

var xhr = new XMLHttpRequest();
xhr.open('GET', '/getSendGridConf', true);
xhr.setRequestHeader('Content-type', 'application/json');
xhr.onload = function () {
    try {
        var data = JSON.parse(this.responseText);

        templateid.val(data.template_id);
        fromemail.val(data.from.email);
        toemail.val(data.personalizations[0].to[0].email);
        subject.val(data.personalizations[0].subject);

        // var value = "";

        // Object.getOwnPropertyNames(data.personalizations[0].dynamic_template_data).forEach((propname) => {
        //     value += propname + "///" + data.personalizations[0].dynamic_template_data[propname] + "\n";
        // });

        passdata.val(JSON.stringify(data.personalizations[0].dynamic_template_data,null, 4));
    }
    catch(ex) {
        dangerAlert.show();
        dangerAlert.html("Config parse failed!")
    }
};
xhr.send(null);

$('#setSendGridConfBtn').on('click', () => {
    try {
        var configStructure = {
            "template_id" : templateid.val(),
            "from": {
                "email": fromemail.val()
            },
            "personalizations": [
                {
                    "to": [
                        {
                            "email": toemail.val()
                        }
                    ],
                    "subject": subject.val(),
                    "dynamic_template_data": JSON.parse(passdata.val())
                }
            ]
        };

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/setSendGridConf', true);
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
        xhr.send(JSON.stringify(configStructure,null, 4));
    }
    catch(ex) {
        successAlert.hide();
        dangerAlert.show();
        dangerAlert.html("Wrong json structure! Please control passdata")
    }
});