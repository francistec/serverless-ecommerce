
$(document).ready(function(){
    var store = [];
    var srcProduct = $("#item-product").html();
    var template = Handlebars.compile(srcProduct);


    app.loadProducts(function(data){
        store = data;
        $.each(data, function(index, item){
            $('.product-list').append(template(item))
        });
    });

    $('.product-list ').on('click','.product',function (event){
        event.preventDefault();
        var id = $(this).data('id');
        var result = _.where(store, {Id: id});
        if(result.length > 0){
            app.car.items.push(result[0]);
        }
        updateCar();
    });

    $('.cart-button').click(function(){
        saveCarToLocalStorage();
        window.location = 'checkout.html';
    });

});

function saveCarToLocalStorage() {

    if (window.sessionStorage) {
        window.sessionStorage.setItem('car', JSON.stringify(app.car.items));
    }
}




function updateCar(){
    $('.items-in-car').text(app.car.items.length);
}


function openNav() {
    document.getElementById("mySidenav").style.width = "70%";
    // document.getElementById("flipkart-navbar").style.width = "50%";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "rgba(0,0,0,0)";
}