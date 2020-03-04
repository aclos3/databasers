//$('#custSearch').click(function(e){
 //   $.post('/searchCust')
    //e.preventDefault();
//});

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

