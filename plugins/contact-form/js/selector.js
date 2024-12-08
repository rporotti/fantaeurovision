




$(document).ready(function(){
    document.getElementsByClassName("container-contact100")[0].style.opacity = 0.3;
    
    document.getElementById("loading").classList.add('lds-facebook');
    var i = 0
    var max_value = 50;



    
    var publicSpreadsheetUrl =
					'https://docs.google.com/spreadsheets/d/1PijymI83WGz3-6wTQSzYVqSi0y6w9wMyjgC9Bn7DauQ/edit?usp=sharing';
	
    
    Tabletop.init({
        key: publicSpreadsheetUrl,
        callback: function (data, tabletop) {
            callback(data); //call up datatables function
        },
        simpleSheet: false
    })
    

    
    function callback(data) {
        
        
        ids = data["odds"].elements.map(x => x["id"])
        odds = data["odds"].elements.map(x => x["Fantavalue"])
        
        

        var selectList = document.getElementById("selection6")
        leagues_temp = data["teams"].elements.map(x => x["league"])
        
        var leagues = [];
        $.each(leagues_temp, function(i, el){
            if($.inArray(el, leagues) === -1) leagues.push(el);
        });

        var option = document.createElement("option");
        option.value = "null";
        option.text = "---";
        selectList.appendChild(option);
        len = leagues.length
        for (var i = 0; i < len; i++) {
            var option = document.createElement("option");
            if (leagues[i]!=""){
                option.value = leagues[i];
                option.text = leagues[i];

                selectList.appendChild(option);
            }
        }
        
        len = $('#selector1').select2()[0].children.length
        for (i = 1; i <= 4; i++) {
            
            childrens = $('#selector'+ i).select2()[0].children

            for (var k = 1; k < len; k++) {
                
                childrens[k].text += " - " + odds[k-1] + " Babushki"
            }
        }
        
        document.getElementById("loading").classList.remove('lds-facebook');
		document.getElementsByClassName("container-contact100")[0].style.opacity = 1.0;
        var costs = new Array(4);
        var select_values = ["null", "null", "null", "null"]
        for (i = 1; i <= 5; i++) {
        $('#selector'+ i).select2().on('change', function(){
            
            
            for (var j = 1; j <= 4; j++) {
                var x = $(document.getElementById("selector"+j))

                if (x.val() == ""){
                    val = "null";
                    cost = 0
                }
                else{
                    val = parseInt(x.val())-1
                    cost = parseInt(odds[val])
                }
                
                select_values[j-1] = val;
                costs[j-1] = cost ;
                
            }
            sum_values = costs.reduce((a, b) => a + b, 0)
            
            if ( $(document.getElementById("selector5")).val() == "null"){
                document.getElementsByClassName("container-contact100-form-btn")[0].style.display = "";
            }
            
    
            
            if (!select_values.includes("null")){
                
                if (sum_values<=max_value && !hasDuplicates(select_values)){
                    var content = '';
                    $(document.getElementById("warning")).html(content);
                    
                    if ( $(document.getElementById("selector5")).val() != "null"){
                        document.getElementById("submit-button").disabled = false
                        
                    }
                    if ( $(document.getElementById("selector5")).val() == "null"){
                        document.getElementById("submit-button").disabled = true
                        
                    }
                }
                if (sum_values>max_value && hasDuplicates(select_values)){
                    var content = '<span class="warning">' +
                            document.getElementById("warning3").innerHTML
                        +'</span>';
                    $(document.getElementById("warning")).html(content);
                    document.getElementById("submit-button").disabled = true
                    
                }
                if (sum_values>max_value && !hasDuplicates(select_values)){
                    var content = '<span class="warning">' +
                            document.getElementById("warning2").innerHTML
                        +'</span>';
                    $(document.getElementById("warning")).html(content);
                    document.getElementById("submit-button").disabled = true
                    
                }
                if (sum_values<=max_value && hasDuplicates(select_values)){
                    var content = '<span class="warning">' +
                            document.getElementById("warning1").innerHTML
                        +'</span>';
                    $(document.getElementById("warning")).html(content);
                    document.getElementById("submit-button").disabled = true
                    
                }
            }
            else{
                document.getElementById("submit-button").disabled = true
                var content = '';
                $(document.getElementById("warning")).html(content);
            }
            
            content = document.getElementById("spending").innerHTML + '&nbsp;' + sum_values + ' Babushki'
            
            $(document.getElementById("counter-points")).html(content).fadeIn('slow');
        }).change();

        
    }
}


$('#radiobutton input').on('change', function() {
    if ($('input[name=league-selection]:checked', '#radiobutton').val()=="null"){
        
        document.getElementById("selection6").value="";
        document.getElementById("selection6-existant").style.display="none";
        document.getElementById("selection6-new").style.display="none";
        document.getElementById("league-textbox").value="";

    }
    if ($('input[name=league-selection]:checked', '#radiobutton').val()=="new"){
        document.getElementById("selection6-new").style.display="";
        document.getElementById("selection6").value="";
        
        document.getElementById("selection6-existant").style.display="none";

    }
    if ($('input[name=league-selection]:checked', '#radiobutton').val()=="existing"){
        document.getElementById("selection6-new").style.display="none";
        document.getElementById("league-textbox").value="";
        
        document.getElementById("selection6-existant").style.display="";
        
    }

    
 });




});


$(document).ready(function(){
      var i = 0
      for (i = 1; i <= 4; i++) {
        $('#selector'+ i).select2().on('change', function(){
            var id_user = "";
            var cell_name = "";
            var content = "";
            if ($(this).val()!=""){
                var id_user =  ("user" + $(this).val());
                var cell_name = "cell" + this.id.replace("selector", "") ;
                var content = '<span class="country-box">' +
                          document.getElementById(id_user).innerHTML
                          +'</span>';
                
                $(document.getElementById(cell_name)).html(content).fadeIn('slow');
                $(document.getElementById(cell_name)).visibility="visibile"
          
            }
            else{
                var cell_name = "cell" + this.id.replace("selector", "") ;
                var content = '';
                
                $(document.getElementById(cell_name)).html(content).fadeIn('slow');
                $(document.getElementById(cell_name)).visibility="visibile"

            }
            
      }).change();
  }
  
  });
  
  
  function hasDuplicates(array) {
      return (new Set(array)).size !== array.length;
  }
  
  function isEmpty(array) {
      return array.includes("");
  }

$('#random-button').on('click',function(event){
    event.preventDefault()
    function shuffle(array) {
        var tmp, current, top = array.length;
        if(top) while(--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
        return array;
        }



    for (var a=[],i=1;i<40;++i) a[i-1]=i;




    flag = false;
    while (flag==false){
        sum_values = 0
        a = shuffle(a);
        for(var i=1; i<=4; i++) {
            sum_values += parseInt(odds[parseInt(a[i-1])-1])
            
        }   
        if (sum_values<=50){
            flag=true
        }
        
    }
    for(var i=1; i<=5; i++) {
        $('#selector' + i).val(a[i-1]).trigger('change');
    }

});