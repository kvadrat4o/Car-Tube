const handlers = {};

$(() =>{
    const app = Sammy('#container',function(){
        //set template engine lib
        this.use('Handlebars','hbs');

        //set welcome page
        this.get('index.html',handlers.getWelcomePage);
        this.get('#/home',handlers.getWelcomePage);

        //set LOGIN, LOGOUT & REGISTER routes
        this.get('#/logout',handlers.logoutUser);
        this.get('#/register', handlers.renderRegisterView);
        this.get('#/login', handlers.renderLoginView);
        this.post('#/login',handlers.loginUser);
        this.post('#/register',handlers.registerUser);

        //set home screen for logged users - all cars listing
        this.get('#/cars',handlers.getAllCars);

        //get my cars
        this.get('#/myCars',handlers.getMyCars);

        //car actions
        this.get('#/createCar',handlers.renderCreateCar);
        this.get('#/editCar/:carId',handlers.renderEditCar);

        this.post('#/createCar',handlers.createCar);
        this.post('#/editCar',handlers.editCar);

        this.get('#/deleteCar/:carId',handlers.deleteCar);

        //get details
        this.get('#/carDetails/:carId',handlers.getCarDetails);




    });

    app.run();
});