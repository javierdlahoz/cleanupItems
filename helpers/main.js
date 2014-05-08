$("input").attr("size", 40);

function showResults(container_id)
{
	$("#"+container_id).fadeIn( "slow", function() { } );
}

function emptyQuery(container_id)
{
	var container = document.getElementById(container_id);
	container.value = "";
}

function find(container_id, container2_id, results_container_id){
	var container = container_id;
	var container2 = document.getElementById(container2_id);
	
	if(container.value == null)
		container2.innerHTML = "Show all";
	else
		container2.innerHTML = "Find";

	if(event.keyCode==13)
		showResults(results_container_id);
}

function validateUserExists(users, user_container){
	console.log("entro");
	var username = user_container.value;
	for(var i=0; i<users.lenght; i++){
		
	}
	
}

function getResponseTag(xml){
	xml = $.parseXML(xml);
	var response = xml.getElementsByTagName("response");
	response = response[0].childNodes[0].nodeValue;
	json = angular.fromJson(response);
	return json;
}

function getDir(){
	return "http://localhost/miturno.co/backend/index.php/";
}

function showError(error){
	error_message = document.getElementById("error_message");
	error_message.innerHTML = error;
	$("#error_message").fadeIn("slow", function(){});
	$("#success_message").fadeOut("slow", function(){});	
}

function showSuccess(message){
	success_message = document.getElementById("success_message");
	success_message.innerHTML = message;
	$("#success_message").fadeIn("slow", function(){});
	$("#error_message").fadeOut("slow", function(){});	
}

function getPagination(table, pageLength){
	var lon = table.length-1;
	var pages = Math.floor(lon/pageLength)+1;
	var k = q = end = 0;
	result = new Array();
	for(var i=0; i<=pages; i++){
		q = 0;
		result[i] = new Array();
		end = k+pageLength;
		for(var j=k; j<end; j++){
			if(j>lon)
				break;

			result[i][q] = table[j];
			q++;
		}
		if(j>lon)
			break;		
		k = end+1;
	}
	return result;
}

function activatePage(ind, pages){
	var li = document.getElementById('page'+ind);
	li.className = "active";
	for(var i=0; i<pages; i++){
		if(i!=ind){
			var li = document.getElementById('page'+i);
			li.className = "";
		}
	}
}