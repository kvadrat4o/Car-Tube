let auth = (() =>{

    function isAuth(){
        return sessionStorage.getItem('authtoken') !== null;
    }

    function clear() {
        sessionStorage.clear();
    }

    function saveSession(userData) {
        sessionStorage.setItem('authtoken', userData._kmd.authtoken);
        sessionStorage.setItem('username', userData.username);
        sessionStorage.setItem('userId', userData._id);
    }

    function register (username, password) {
        let obj = { username, password };

        return remote.post('user', '', 'basic', obj);
    }

    function login(username, password) {
        let obj = { username, password };

        return remote.post('user', 'login', 'basic', obj)
    }

    function logout() {
        return remote.post('user', '_logout', 'kinvey');
    }

    function getUsername(){
        return sessionStorage.getItem('username');
    }

    function getUserId(){
        return sessionStorage.getItem('userId');
    }

    function getAuthToken(){
        return sessionStorage.getItem('authtoken');
    }

    return {saveSession,getUserId,getUsername,login,register,logout,getAuthToken,isAuth,clear}
})();