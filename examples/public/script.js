//  Author:  Andrew Clos
//  Date:  12/6/2019
//  Title: Assignment 6: Database and UI
//  Description: This project demonstrates some simple backend database and UI interactions by tracking workouts.

//listen for the submit button being clicked, then run the following function
document.getElementById('submitEx').addEventListener('click',function(event){     
    
    //New request is made that will take paremeters from data entered by the user (in the exerciseEntry)
    //and then will build a string of these parameters that will later be parsed and entered in to the database.
	var submitEx = document.getElementById("exerciseEntry");            
    
    var req = new XMLHttpRequest();
	//build the string
	var paramEntry = "exerciseType="+submitEx.elements.exerciseType.value+"&reps="+submitEx.elements.reps.value+
					"&weight="+submitEx.elements.weight.value+"&date="+submitEx.elements.date.value+"&unit="+submitEx.elements.unit.value;

	//perform the asynchronous GET request.
	req.open("GET", "/insert?" + paramEntry, true);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');  
	
	//add to the table after loading  
	req.addEventListener('load', function(){                          
		if(req.status >= 200 && req.status < 400){
			
			//variables for JSON response row information, and table from the document.                                               
			var response = JSON.parse(req.responseText);            
			var id = response.workouts;
			var table = document.getElementById("exerciseTable");
			
			//adding a row at the end   
			var addRow = table.insertRow(-1);                          
			
			//the following section will populate the rows including the "hidden values"
			//NAME
			var name = document.createElement('td');                
			name.textContent = submitEx.elements.exerciseType.value; 
			addRow.appendChild(name);
			
			//REPS
			var repetitions = document.createElement('td');
			repetitions.textContent = submitEx.elements.reps.value;
			addRow.appendChild(repetitions);

			//WEIGHT
			var tonnage = document.createElement('td');
			tonnage.textContent = submitEx.elements.weight.value;
			addRow.appendChild(tonnage);

			//DATE
            var dte = document.createElement('td');                      
			dte.textContent = submitEx.elements.date.value;
			addRow.appendChild(dte);
			
			//UNITS
			var units = document.createElement('td');
			units.textContent = submitEx.elements.unit.value;
			addRow.appendChild(units);

			//UPDATE
			//establish variables and then set attributes to "build" the button.  I wanted to do this
			// without using "innerHTML"
			var updte = document.createElement('td');
			var upConnect = document.createElement('a');
			var uButton = document.createElement('input');

			upConnect.setAttribute('href', '/refreshExercise?id=' + id);
			uButton.setAttributes({'type':'button', 'value':'Update Exercise'});
			
			upConnect.appendChild(uButton);
			updte.appendChild(upConnect);
			addRow.appendChild(updte);

			//DELETE
   			//establish variables and then set attributes to "build" the button.  I wanted to do this
			// without using "innerHTML"
			var del = document.createElement('td');                 
			var dButton = document.createElement('input');    
			var hide = document.createElement('input'); 
			
			dButton.setAttributes({'type':'button', 'name':'delete', 'value':'Delete', 'onClick':'delRow("exerciseTable",' + id +')'});
			hide.setAttributes({'type':'hidden','id':'delete' + id});
			
			del.appendChild(dButton);                           
			del.appendChild(hide);
			addRow.appendChild(del);                                   

		}
		else {
	    	console.log("An error has occurred!");
		}
	});
	req.send("/insert?" + paramEntry);                              
	event.preventDefault();                                
});

//this function deletes a row from the table.
function delRow(tableId, id){                                
	
	//set up variables for the table and the table size (number of rows)
	var tble = document.getElementById(tableId);       
	var tSize = tble.rows.length;
	var r = "";
	var rowContents = "";
	var toDelete = "";
	var del = "delete"+id;

	//loop through each row and look for the "delete" flag.
	for(var i = 0; i < tSize - 1; i++)
	{                           
		r = tble.rows[i+1];
		rowContents = r.getElementsByTagName("td");		   
		toDelete = rowContents[rowContents.length - 1];		        
		
		//if the row's hidden "delete me" item is flagged, the row will get deleted.
		if(toDelete.children[1].id === del)
		{         
			tble.deleteRow(i+1);
		}
	}
    //Make the request to delete the data
	var req = new XMLHttpRequest();
	
	//asynchronous GET request
	req.open("GET", "/delete?id=" + id, true);              
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

	req.addEventListener("load",function(){
		if(req.status >= 200 && req.status < 400)
		{          
	    	console.log('The delete was successful.');
		} else 
		{
		    console.log('An error has occurred during delete.');
		}
	});
	req.send("/delete?id=" + id);                          
}

//source cited for extending Element prototype
// https://stackoverflow.com/questions/12274748/setting-multiple-attributes-for-an-element-at-once-with-javascript
Element.prototype.setAttributes = function (attrs) {
    for (var idx in attrs) {
        if ((idx === 'styles' || idx === 'style') && typeof attrs[idx] === 'object') {
            for (var prop in attrs[idx]){this.style[prop] = attrs[idx][prop];}
        } else if (idx === 'html') {
            this.innerHTML = attrs[idx];
        } else {
            this.setAttribute(idx, attrs[idx]);
        }
    }
};