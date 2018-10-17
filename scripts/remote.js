let remote = (() =>{

    const BASE_URL = `https://baas.kinvey.com/`;
    const APP_KEY = `kid_BkNWwP6B7`;
    const APP_SECRET = `092cbcde121245a09958068f59cecaae`;

    function makeAuth(type){
        return type === 'basic' ?  'Basic ' + btoa(APP_KEY + ':' + APP_SECRET) :  'Kinvey ' + sessionStorage.getItem('authtoken');
    }

    function makeRequest(method,module,endpoint,auth){
        return req = {
            method,
            url: BASE_URL + module + '/' + APP_KEY + '/' +  endpoint,
            headers: {
                'Authorization': makeAuth(auth),
                'Content-type': 'application/json'
            }
        }
    }

    function get(module,endpoint,auth){
        return $.ajax(makeRequest('GET',module,endpoint,auth));
    }

    function post(module,endpoint,auth,data){
        let req = makeRequest('POST',module,endpoint,auth);
        req.data = JSON.stringify(data);
        return $.ajax(req);
    }

    function update(module,endpoint,auth,data){
        let req = makeRequest('PUT',module,endpoint,auth);
        req.data = JSON.stringify(data);
        return $.ajax(req);
    }

    function remove(module,endpoint,auth){
        return $.ajax(makeRequest('DELETE',module,endpoint,auth));
    }

    return {get,post,update,remove}
})();