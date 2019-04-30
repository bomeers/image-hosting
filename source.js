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
                img = $('<img height="150" style="padding: 5px;" >');
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