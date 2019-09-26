var config = {
    api: `https://1rx787vw52.execute-api.us-east-1.amazonaws.com/dev`
};


var app = {
    car: {
        items:[]
    },
    loadProducts: function(callback){

        $.ajax({
            url: `${config.api}/products`,
            method:'GET',
            dataType: 'json',
            error: function(a,b,c){
                console.log(a,b,c);
            },
            success: callback
        })
    }
};