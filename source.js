$(document).ready(function () {
    if (window.location.search.includes('?')) {
        var repo = getUrlParameter('repo');
        var token = getUrlParameter('token');

        $('#inputRepo').val(repo);
        $('#inputToken').val(token);
    }
});

function getUrlParameter(sParam) {
    var sPageUrl = window.location.search.substring(1);
    var sURLVariables = sPageUrl.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1];
        }
    }
};

function getData() {
    repoName = $("#inputRepo").val();
    token = $("#inputToken").val();
    downloadBtn = $("#show-download-btn");

    $.ajax({
        url: "https://api.github.com/repos/bomeers/" + repoName + "/contents",
        headers: {
            Authorization: "token " + token
        },
        beforeSend: function () {
            $('#image-container').remove();
            downloadBtn.hide();
        },
        success: function (returnData) {
            index = 0;
            imageContainer = $('<div id="image-container"></div>');
            imageContainer.appendTo('#repo-token');
            downloadBtn.show();
            downloadBtn.click(function () {
                window.open('https://api.github.com/repos/bomeers/' + repoName + '/zipball/master?access_token=' + token);
            })
            $.each(returnData, function () {
                a = $('<a target="_blank"></a>');
                a.attr('href', returnData[index].download_url);
                img = $('<img height="200" style="padding: 5px;" >');
                img.attr('src', returnData[index].download_url);
                img.appendTo(a);
                a.appendTo(imageContainer);
                index++;
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Error: " + errorThrown);
        }
    });
}
