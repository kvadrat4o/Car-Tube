let cars = (() =>{
    function getAllCars(){

        let endpoint = `cars?query={}&sort={"_kmd.ect": -1}`;
        return remote.get('appdata',endpoint,'kinvey');
    }

    function createCar(brand,description,fuel,imageUrl,isAuthor,model,price,seller,title,year){
        let endpoint = 'cars';
        let car = {brand,description,fuel,imageUrl,isAuthor,model,price,seller,title,year};
        return remote.post('appdata',endpoint,'kinvey',car);
    }

    function editCar(car_id,brand,description,fuel,imageUrl,isAuthor,model,price,seller,title,year){
        let endpoint = `cars/${car_id}`;
        let car ={brand,description,fuel,imageUrl,isAuthor,model, price,seller,title,year};
        return remote.update('appdata',endpoint,'kinvey',car)
    }

    function deleteCar(car_id){
        let endpoint = `cars/${car_id}`;
        return remote.remove('appdata',endpoint,'kinvey');
    }

    function getMyCars(username){
        let endpoint = `cars?query={"seller":"${username}"}&sort={"_kmd.ect": -1}`;

        return remote.get('appdata',endpoint,'kinvey');
    }

    function getCarById(car_id){
        const endpoint = `cars/${car_id}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    return {getAllCars,getMyCars,createCar,editCar,deleteCar,getCarById}
})();