
//MANAGER PAGE
$('#custClick').click(function(e){
    $.post('/assignCust')
    //e.preventDefault();
});

$('#empClick').click(function(e){
    $.post('/assignEmp')
   //e.preventDefault();
});

$('#prodClick').click(function(e){
    $.post('/assignProd')
    //e.preventDefault();
});

$('#salClick').click(function(e){
    $.post('/assignSale')
    //e.preventDefault();
});


//CUSTOMER
$('#custDelete').click(function(e){
    $.post('/deleteCust')
    //e.preventDefault();
});

$('#custSearch').click(function(e){
    $.post('/searchCust')
    //e.preventDefault();
});


//EMPLOYEE
$('#empUpClick').click(function(e){
    $.post('/updateEmp')
    //e.preventDefault();
});
