var totalProducts = 0;

var srcProduct = $("#resume-item").html();
var template = Handlebars.compile(srcProduct);
var price = 0;

var checkout = {
    loadProducts: function (){
        var products = window.sessionStorage.getItem('car');
        products = JSON.parse(products);
        totalProducts = products.length;
        $('.item-number.items-in-car').text(totalProducts);
        $('.pill-badge-notification').text(totalProducts);

        $.each(products, (index, item)=>{
            price += parseFloat(item.Price.clean);
            $('.products-sidebar').append(template(item));
        })
        

    }
};

function validateData(){
    //firstName
    //lastName
    //email
    //address
    //address2
    //country
    //state
    //zip

}

checkout.loadProducts();
console.log("en el checkout");