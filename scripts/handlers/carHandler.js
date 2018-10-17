handlers.getWelcomePage = function(ctx){
    ctx.isAuth = auth.getAuthToken();
    ctx.username = auth.getUsername();
    ctx.loadPartials({
        header:'./templates/common/header.hbs',
        footer:'./templates/common/footer.hbs'
    }).then(function(){
        this.partial('./templates/home.hbs');
    });
};

handlers.renderCreateCar = function(ctx){

    ctx.isAuth = auth.isAuth();
    ctx.username = auth.getUsername();
    ctx.loadPartials({
        header:'./templates/common/header.hbs',
        footer:'./templates/common/footer.hbs'
    }).then(function(){
        this.partial('./templates/car/create.hbs');
    });
};

handlers.renderEditCar = function(ctx){
    let car_id = ctx.params.carId;
    console.log(car_id);
    ctx.isAuth = auth.isAuth();
    ctx.username = auth.getUsername();

    ctx.loadPartials({
        header:'./templates/common/header.hbs',
        footer:'./templates/common/footer.hbs'
    }).then(function(){
        this.partial('./templates/car/edit.hbs');
    });

    cars.getCarById(car_id)
        .then((car) => {
            ctx.isAuth = auth.isAuth();

            ctx.username = sessionStorage.getItem('username');
            ctx.car = car;
            ctx.carId = car._id;
            console.log(ctx.carId);
            console.log(car);
            ctx.loadPartials({
                header:'./templates/common/header.hbs',
                footer:'./templates/common/footer.hbs'
            }).then(function(){
                this.partial('./templates/car/edit.hbs');
            });
        }).catch(notify.handleAjaxError);
};

handlers.createCar = function(ctx){


    ctx.isAuth = sessionStorage.getItem('authtoken') !== null;
    ctx.username = auth.getUsername();

    let title = ctx.params.title;
    let description = ctx.params.description;
    let model = ctx.params.model;
    let brand = ctx.params.brand;
    let year = ctx.params.year;
    let imageUrl = ctx.params.imageUrl;
    let price = Number(ctx.params.price);
    let fuelType = ctx.params.fuelType;
    let isAuthor = true;
    let seller = auth.getUsername();

    if(title.length > 33){
        notify.showError('Title must be below 33 characters long!');
    }else if(description.length < 30){
        notify.showError('Description must be at least 30 characters long!');
    }else if(description.length > 450){
        notify.showError('Description must not be longer than 450 symbols!');
    }else if(brand.length > 11){
        notify.showError('Brand must be below 11 characters long!');
    }else if(model.length > 11){
        notify.showError('Model must be below 11 characters long!');
    }else if(model.length < 4) {
        notify.showError('Model must be bat least 4 characters long!');
    }else if(fuelType.length > 11){
        notify.showError('Fuel type must be below 11 characters long!');
    }else if(year.length < 4 || year.length > 4){
        notify.showError('Year must be 4 characters long!');
    }else if(price > 1000000){
        notify.showError('Price must be below 1 000 000 $!');
    }else if(!imageUrl.startsWith('http') || !imageUrl.startsWith('https')) {
        notify.showError('Image url should be valid (starting with either http, or https)!');
    }else {
        //console.log(seller);
        cars.createCar(brand,description,fuelType,imageUrl,isAuthor,model,price,seller,title,year)
            .then(() =>{
                ctx.isAuth = sessionStorage.getItem('authtoken') !== null;
                notify.showInfo('listing created.');
                ctx.redirect('#/cars')
        }).catch(notify.handleAjaxError);
    }

};

handlers.editCar = function(ctx){

    let car_id = ctx.params.carId;
    ctx.username = auth.getUsername();

    console.log(ctx.car);
    let title = ctx.params.title;
    let description = ctx.params.description;
    let model = ctx.params.model;
    let brand = ctx.params.brand;
    let year = ctx.params.year;
    let imageUrl = ctx.params.imageUrl;
    let price = Number(ctx.params.price);
    let fuelType = ctx.params.fuelType;
    let isAuthor = true;
    let seller = auth.getUsername();

    if(title.length > 33){
        notify.showError('Title must be below 33 characters long!');
    }else if(description.length < 30){
        notify.showError('Description must be at least 30 characters long!');
    }else if(description.length > 450){
        notify.showError('Description must not be longer than 450 symbols!');
    }else if(brand.length > 11){
        notify.showError('Brand must be below 11 characters long!');
    }else if(model.length > 11){
        notify.showError('Model must be below 11 characters long!');
    }else if(model.length < 4) {
        notify.showError('Model must be bat least 4 characters long!');
    }else if(fuelType.length > 11){
        notify.showError('Fuel type must be below 11 characters long!');
    }else if(year.length < 4 || year.length > 4){
        notify.showError('Year must be 4 characters long!');
    }else if(price > 1000000){
        notify.showError('Price must be below 1 000 000 $!');
    }else if(!imageUrl.startsWith('http') || !imageUrl.startsWith('https')) {
        notify.showError('Image url should be valid (starting with either http, or https)!');
    }else{
        cars.editCar(car_id,brand,description,fuelType,imageUrl,isAuthor,model,price,seller,title,year)
            .then(function(){
                ctx.isAuth = sessionStorage.getItem('authtoken') !== null;
                notify.showInfo(`Listing ${title} updated`);
                ctx.redirect('#/cars');
            }).catch(notify.handleAjaxError);
    }
};

handlers.getAllCars = function(ctx){
    if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
    }
    ctx.username = auth.getUsername();

    cars.getAllCars()
        .then((cars) =>{
            ctx.isAuth = auth.isAuth();
            ctx.cars = cars;

            ctx.loadPartials({
                header:'./templates/common/header.hbs',
                footer:'./templates/common/footer.hbs'
            }).then(function(){
                this.partial('./templates/car/listings/allCars.hbs')
            })
        })

};

handlers.getMyCars = function(ctx){

    ctx.username = auth.getUsername();
    if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
    }
    let username = ctx.username;

    cars.getMyCars(username)
        .then((cars) =>{
            ctx.isAuth = auth.isAuth();
            ctx.cars = cars;

            ctx.loadPartials({
                header:'./templates/common/header.hbs',
                footer:'./templates/common/footer.hbs'
            }).then(function(){
                this.partial('./templates/car/listings/myCars.hbs')
            })
        }).catch(notify.handleAjaxError);
};

handlers.getCarDetails = function(ctx){
    let car_id = ctx.params.carId;
    ctx.username = auth.getUsername();


    cars.getCarById(car_id)
        .then((car) =>{
          ctx.isAuth = auth.isAuth();
          ctx.username = sessionStorage.getItem('username');
          ctx.car = car;
          //ctx.carId = car._id;

          ctx.loadPartials({
              header:'./templates/common/header.hbs',
              footer:'./templates/common/footer.hbs'
          }).then(function(){
              this.partial('./templates/car/details.hbs');
          })
    }).catch(notify.handleAjaxError);


};

handlers.deleteCar = function(ctx){
    if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
    }
    let car_id = ctx.params.carId;

    cars.deleteCar(car_id)
        .then(() => {
            notify.showInfo('Listing deleted.');
            ctx.redirect('#/cars');
        })
        .catch(notify.handleError);
};





