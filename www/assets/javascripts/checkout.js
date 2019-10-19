var totalProducts = 0;

var srcProduct = $("#resume-item").html();
var template = Handlebars.compile(srcProduct);

var checkout = {
    loadProducts: function (){
        var products = window.sessionStorage.getItem('car');
        products = JSON.parse(products);
        totalProducts = products.length;
        $('.item-number.items-in-car').text(totalProducts);
        $('.pill-badge-notification').text(totalProducts);

        $.each(products, (index, item)=>{
            console.log(item);
            $('.products-sidebar').append(template(item));
        })
        

    }
};

checkout.loadProducts();
console.log("en el checkout");