//MANAGER PAGE

$('#custClick').click(function(e){
    $.post('/assignCust');
});

$('#empClick').click(function(e){
    $.post('/assignEmp');
});

$('#prodClick').click(function(e){
    $.post('/assignProd');
});

$('#salClick').click(function(e){
    $.post('/assignSale');
});

$('#spClick').click(function(e){
  $.post('/assignSp');
});

//CUSTOMER
$('#custSearch').click(function(e){
    $.post('/searchCust');
});

//DELETING A CUSTOMER
function delCust(id) {
//Make the request to delete the data
    var req = new XMLHttpRequest();
	
    //asynchronous GET request
    req.open("GET", "/customerDelete?id=" + id, true);              
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
    req.send("/customerDelete?id=" + id);    
    location.reload();                      
}

//EMPLOYEE
//will load the update page for the selected employee
function upEmp(id) {
    var req = new XMLHttpRequest();
	
    //asynchronous GET request
    req.open("GET", "/upEmp?id=" + id, true);              
    req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    req.addEventListener("load",function(){
        if(req.status >= 200 && req.status < 400)
        {          
            console.log('The update was successful.');
        } else 
        {
            console.log('An error has occurred during update.');
        }
    }); 
    req.send("/upEmp?id=" + id);
    window.location.href='/upEmp?=' + id;   
}

//updates the selected employee with the new values
$('#empUpdate').click(function(e){
    $.post('/upEmp');
});
