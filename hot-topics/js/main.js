/*global $, console, alert, confirm, prompt*/

$(document).ready(function () {
   "use strict"; 
/* Ajax Page change */    
    var Pages, url;
    Pages = {};
    
//    Load the first content by default on page load
    $(".main-content").load("./partials/home.html", function (response){
        Pages["./partials/home.html"] = response;
    });
//    console.log(Pages);
    function loadContents(urlParam){
        if (Pages[urlParam]){
//            load the content from array
            $(".main-content").html(Pages[urlParam]);
            console.log("loaded from array");
        } else {
//            load the content by ajax request
            $(".main-content").load(urlParam, function (response){
                Pages[urlParam] = response;
                console.log("added to Pages and using ajax");
            });
        }
    }
    
    $("nav a").on("click", function (ev) {
       ev.preventDefault();       
        url = $(this).attr("href");
        loadContents(url);
        $(".main-content").on("submit", "form", handleForm);
    });
    
/* Form Handler */
    function handleSuccess(response) {
        $(".feedback").html(response);
        $("form").each(function(){
        this.reset();
    });
    }

    function handleError(jqXHR, textStatus, errorThrown) {
        console.log("textStatus: " + textStatus + "\n" + "errorThrown: " + errorThrown);
    }

    function handleForm(ev) {
        ev.preventDefault();

        var error, formData, fullName, email, subject, comments;
        error = [];
        formData = {};
        fullName = $.trim($("#fullName").val());
        email = $.trim($("#email").val());
        subject = $.trim($("#subject").val());
        comments = $.trim($("#comments").val());

        if (fullName !== "") {
            formData.full_name = fullName;
        } else {
            error.push("Name is missing<br>");
        }
        if (email !== "") {
            formData.email = email;
        } else {
            error.push("Email is missing<br>");
        }
        if (subject !== "") {
            formData.subject = subject;
        } else {
            error.push("Subject is missing<br>");
        }
        if (comments !== "") {
            formData.comments = comments;
        } else {
            error.push("Comments are missing");
        }
        if (error.length === 0) {
            //Ajax maxics
            $.ajax({
                type: "post",
                url: "./partials/web-service.php",
                data: formData,
                dataType: "text"
            }).done(handleSuccess).fail(handleError);
        } else {
            $(".feedback").html(error);
        }
    }
    
});

