$(function(){
	
	
	
	var parseAddForm = function (data) {
  
  //console.log(data);
};
	
	var addForm = $("#giftForm"),
		addErrLink = $("#addErrLink")
	;
	
	addForm.validate({
		invalidHandler: function(form, validator){
			addErrLink.click();
			var html = "";
			for(var key in validator.submitted){
				var label = $("label[for^='"+key+"']").not("[generated]");
				var legend = label.closest("fieldset").find(".ui-controlgroup-label");
				var fieldName = legend.lenght ? legend.text() : label.text();
				html += "<li>" + fieldName + "</li>";
			};
			$("#giftErrors ul").html(html);
			
		},
		submitHandler: function(){
			var data = addForm.serializeArray();
			parseAddForm(data);
			
			}
		
		
	});
	
	function store(key){
		if(!key){
		var id = Math.floor(Math.random()*10000001);
		}else{
			id = key;
		}
		
		var listItem = {};
			listItem.pName =       ["First Name:", $("#pName").val()];
			listItem.giftType =       ["type:", $("#giftType").val()];
			listItem.location =    ["locate:", $("#location").val()];
			listItem.giftDisc =        ["discrip:", $("#giftDisc").val()];
			
			
			localStorage.setItem(id, JSON.stringify(listItem));
			alert("gift Saved!");
			window.location.reload();
			
	}
	
	function disStorage(){
		if(localStorage.length === 0){
			alert("there is no data");
		}
		var makeDiv = $("#giftList").add("div");
		makeDiv.attr("id", "listItems");
		var makeList = $("#listItems").add("ul");
		makeDiv.append(makeList);
		document.body.append(makeDiv);
		//$("#listItems").css(display: block);
		for(var i = 0,j=localStorage.length; i<j; i++){
			var makeLi = $("#listItems").find("ul").add("li");
			var linksLi = $("#listItems").find("li").add("li");
			makeList.append(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var object = JSON.parse(value);
			var makeSubLi = $("#listItems").find("li").add("ul");
			makeLi.append(makeSubLi);
			for( var n in object){
				var makeSubList = makeSubLi.add("li");
				var objSubText = object[n][0] +" "+object[n][1];
				makeSubList.innerHTML = objSubText;
				makeSubLi.append(linksLi);
			}
		}
	}
	
	/*function getStorage (){
		//toggleControl("on");
		if(localStorage.length === 0){
			alert("there is no data so I added some for you");
			autoFill();
		}
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "listItems");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("#listItems").style.display = "block";
		for(var i = 0, j=localStorage.length; i<j; i++){
			var makeLi = document.createElement("li");
			var linksLi = document.createElement("li")
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//turns string back to object
			var object = JSON.parse(value);
			var makeSubLi = document.createElement("ul");
			makeLi.appendChild(makeSubLi);
			for( var n in object){
				var makeSubList = document.createElement("li");
				makeSubLi.appendChild(makeSubList);
				var objSubText = object[n][0] +" "+object[n][1];
				makeSubList.innerHTML = objSubText;
				makeSubLi.appendChild(linksLi);
			}
		//makeItemLinks(localStorage.key(i), linksLi);
			
		}
		
		
	}*/
	function clearData () {
	  if(localStorage.length === 0){
	  alert("no data")
	  }else{ 
	  	localStorage.clear();
	  	alert("gifts deleted!");
	  	window.location.reload();
	  	return false;
	   }
	}
	
	$.ajax({
		url:"xhr/json.php",
		type: "get",
		dataType:"json",
		success: function (respond){
			for (var i = 0, j=respond.gifts.length; i<j; i++){
				var jso = respond.gifts[i];
				$(''+
					"<li>name</li>"+
					"<li>type</li>"+
					"<li>location</li>"+
					"<li>discrip</li>"
			).appendTo("#giftList");
				
		};
			
		}
		
	});

	
	$("#giftForm").on("submit", store)
	$("#displyStorage").click(disStorage)
	$("#clearStorage").click(clearData)
	
	
	console.log(localStorage);
});
