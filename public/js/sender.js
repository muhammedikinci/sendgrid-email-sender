if ($('#startSending')) {
    var successAlert = $('#successAlert');
    var dangerAlert = $('#dangerAlert');

    serviceStatus();

    $('#refresh').on('click', () => {
        serviceStatus();
    });

    $('#startSending').on('click', () => {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', '/startSending?time=' + $('#waittime').val(), true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function () {
            var data = JSON.parse(this.responseText);

            if (data) {
                successAlert.show();
                successAlert.html("Started!");
                dangerAlert.hide();
            }
            else {
                successAlert.hide();
                dangerAlert.html("Already is working");
                dangerAlert.show();
            }
        };
        xhr.send(null);
    });

    $('#stopService').on('click', () => {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', '/stopSending', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function () {
            serviceStatus();
        };
        xhr.send(null);
    });

    function serviceStatus() {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', '/isSenderWorking', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function () {
            var data = JSON.parse(this.responseText);
            $('#statusSpan').removeClass();

            if (data) {
                $('#statusSpan').addClass("green");
                $('#stopService').show();
            }
            else {
                $('#statusSpan').addClass("red");
                $('#stopService').hide();
            }
        };
        xhr.send(null);
    }
}