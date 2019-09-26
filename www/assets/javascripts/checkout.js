var checkout = {
    loadProducts: function (){
        var products = window.sessionStorage.getItem('car');
        products = JSON.parse(products);
        console.log(products);
    }
};

checkout.loadProducts();
console.log("en el checkout");