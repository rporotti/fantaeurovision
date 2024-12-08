



(function ($) {    
    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function(){
        $(this).on('blur', function(){
            if(validate(this) == false){
                showValidate(this);
            }
            else {
                $(this).parent().addClass('true-validate');
            }
        })    
    })
  

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(event){
        var check = true;
        event.preventDefault();  
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        if (document.getElementById("submit-button").disabled == true){
            check=false;
        }
        var form = event.target;
        var formData = getFormData(form);
        
        if (formData.honeypot) {
            check=false;
          }
    
        if (check == true){
            
            var content = '';
            $(document.getElementById("warning")).html(content);
            
            
            if (
                document.getElementsByClassName("contact100-form-btn")[0].classList.contains('loading')
              ) return;
            document.getElementsByClassName("contact100-form-btn")[0].classList.add('loading');



            
            
            var data = formData.data;
            
            if (data["league-selection"]=="new"){
                if (data["league-textbox"]!=""){
                    data["league"] = data["league-textbox"]
                } 
                else{
                    data["league"] = data["league-textbox"]
                }
            }
            if (data["league-selection"]=="null"){
                data["league"] = ""

            }
            if (data["league-selection"]=="existing" ){
                if (data["selection6"]=="null"){
                    data["league"] = ""
                }
                else{
                    data["league"] = data["selection6"]
                }
            }
            delete data["league-selection"];
            delete data["league-textbox"];
            delete data["selection6"];
            
            
            for (i = 1; i <= 5; i++) {
                data["selection"+i] = $( "#selector" + i + " option:selected" ).text().split(" - ")[0];    
            }
            var url = form.action;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            // xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    form.reset();       
                    var formElements = form.querySelector(".wrap-contact100")
                    if (formElements) {
                        formElements.style.display = "none"; // hide form
                    }
                    document.getElementsByClassName("contact100-form-btn")[0].classList.remove('loading');
                    document.getElementsByClassName("contact100-form-btn")[0].classList.add('loaded');
                
                    content = "<span class='success-message'>Thank you for your submission!</span><br>"
                    $(document.getElementById("success-bar"))[0].style.display = "";
                    $(document.getElementById("success-bar")).html(content);
                }
            };
    
            // url encode form data for sending as post data
            var encoded = Object.keys(data).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
            }).join('&');
            xhr.send(encoded);
        }
        return check;

    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
           $(this).parent().removeClass('true-validate');
        });
    });

     function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }

        if($(input).val().trim() == ''){
            return false;
        }
        
 
     }
    

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');

        $(thisAlert).append('<span class="btn-hide-validate">&#xf136;</span>')
        $('.btn-hide-validate').each(function(){
            $(this).on('click',function(){
               hideValidate(this);
            });
        });
    }




    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
        $(thisAlert).find('.btn-hide-validate').remove();
    }
    
    function hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }
    
    function isEmpty(array) {
        return array.includes("");
    }


    function getFormData(form) {
        var elements = form.elements;
        var honeypot;
        
        var fields = Object.keys(elements).filter(function(k) {
            if (elements[k].name === "honeypot") {
                honeypot = elements[k].value;
                return false;
              }
            return true;
        }).map(function(k) {
            if(elements[k].name !== undefined) {
            return elements[k].name;
            // special case for Edge's html collection
            }else if(elements[k].length > 0){
            return elements[k].item(0).name;
            }
        }).filter(function(item, pos, self) {
            return self.indexOf(item) == pos && item;
        });
    
        var formData = {};
        fields.forEach(function(name){
            var element = elements[name];
            
            // singular form elements just have one value
            formData[name] = element.value;
    
            // when our element has multiple items, get their values
            if (element.length) {
            var data = [];
            for (var i = 0; i < element.length; i++) {
                var item = element.item(i);
                if (item.checked || item.selected) {
                data.push(item.value);
                }
            }
            
            formData[name] = data.join(', ');
            }
        });
        
        // add form-specific values into the data
        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
        formData.formGoogleSendEmail
            = form.dataset.email || ""; // no email by default
    
        return {data: formData, honeypot: honeypot};
        }
    

})(jQuery);





$(".js-select2").each(function(){
    $(this).select2({
        minimumResultsForSearch: 20,
        dropdownParent: $(this).next('.dropDownSelect2')
    });


    $(".js-select2").each(function(){
        $(this).on('select2:close', function (e){
            if($(this).val() == "Please chooses") {
                $('.js-show-service').slideUp();
            }
            else {
                $('.js-show-service').slideUp();
                $('.js-show-service').slideDown();
            }
        });
    });
})