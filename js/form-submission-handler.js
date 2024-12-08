
(function() {
  // get all data in form and return object
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

  function handleFormSubmit(event) {  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    var form = event.target;
    var formData = getFormData(form);
    var data = formData.data;

    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) {
      return false;
    }

    disableAllButtons(form);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          form.reset();
          var formElements = form.querySelector(".form-elements")
          if (formElements) {
            formElements.style.display = "none"; // hide form
          }
          var thankYouMessage = form.querySelector(".thankyou_message");
          if (thankYouMessage) {
            thankYouMessage.style.display = "block";
          }
        }
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    xhr.send(encoded);
  }
  
  function loaded() {
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
})();





  

$(document).ready(function(){
  var choices = ["", "", "", ""]
  $('#content').hide(); 
	var i = 0 
	for (i = 1; i <= 4; i++) {
  	$('#selector'+ i).niceSelect().on('change', function(){
  		var id_user = "";
      var cell_name = "";
      var content = "";
      choices[ this.id.replace("selector", "")-1 ] =  $(this).val()
  		if ($(this).val()!=""){
  			var id_user =  ("user" + $(this).val());
        var cell_name = "cell" + this.id.replace("selector", "") ;
        var content = '<span class="card">' + 
                        document.getElementById(id_user).innerHTML
                        +'</span>';
        $(document.getElementById(cell_name)).html(content).fadeIn('slow');
        console.log(choices)
        // $(document.getElementById(cell_name)).innerHTML =  content;
      }
	}).change();
  
  
  
}
/* 

  $('#selector1').on('change', function(){
      var id_user = "";
      var cell_name = "";
      var content = "";
      
      choices[ 0] =  $(this).val()
      console.log(choices)
      if ($(this).val()!=""){
        var id_user =  ("user" + $(this).val());
        var cell_name = "cell1" ;
        var content = document.getElementById(id_user).textContent;
        document.getElementById(cell_name).innerHTML = content;
      }
  }).change();
  $('#selector2').on('change', function(){
      var id_user = "";
      var cell_name = "";
      var content = "";
      
      choices[1 ] =  $(this).val()
      console.log(choices)
      if ($(this).val()!=""){
        var id_user =  ("user" + $(this).val());
        var cell_name = "cell2" ;
        var content = document.getElementById(id_user).textContent;
        document.getElementById(cell_name).innerHTML = content;
      }
  }).change();
  $('#selector3').on('change', function(){
      var id_user = "";
      var cell_name = "";
      var content = "";
      
      choices[ 2] =  $(this).val()
      console.log(choices)
      if ($(this).val()!=""){
        var id_user =  ("user" + $(this).val());
        var cell_name = "cell3" ;
        var content = document.getElementById(id_user).textContent;
        document.getElementById(cell_name).innerHTML = content;
      }
  }).change(); */
});


// document.getElementById('submit').onclick = function() {
// 	console.log(choices);
//    if (hasDuplicates(choices) || 
//    			isEmpty(choices))
//    {
//    			console.log("Check again!")
//    }
//    else{
   		
//    }
   
// };
function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

function isEmpty(array) {
    return array.includes("");
}
