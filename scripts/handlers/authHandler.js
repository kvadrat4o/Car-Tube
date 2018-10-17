handlers.loginUser = function(ctx){

    let username = ctx.params.username;
    let password = ctx.params.password;

    if(!/^[a-zA-Z]{3,}$/.test(username)){
        notify.showError('Username must be at least 3 symbols of english alphabet!');
    }else if(username === ''){
        notify.showError('Username must be submitted!');
    }else if(username.length < 3){
        notify.showError('Username should be at least 3 symbols!');
    }else if(!/^[a-zA-Z/d]{6,}/.test(password)){
        notify.showError('Password must be at least 6 symbols and contain only digits or symbols from english alphabet!');
    }else if(password.length < 6){
        notify.showError('Password must be at least 6 symbols!');
    }else if(password === ''){
        notify.showError('Password myst be submitted!');
    }else {
        auth.login(username,password)
            .then(function(userData){
                auth.saveSession(userData);
                notify.showInfo('Login successful');
                ctx.redirect('#/cars');
            }).catch(notify.handleAjaxError);
    }
};

handlers.registerUser = function(ctx){

    let username = ctx.params.username;
    let password = ctx.params.password;
    let repeatPass = ctx.params.repeatPass;

    if(!/^[a-zA-Z]{3,}$/.test(username)){
        notify.showError('Username must be at least 3 symbols of english alphabet!');
    }else if(username === ''){
        notify.showError('Username must be submitted!');
    }else if(username.length < 3){
        notify.showError('Username should be at least 3 symbols!');
    }else if(!/^[a-zA-Z/d]{6,}/.test(password)){
        notify.showError('Password must be at least 6 symbols and contain only digits or symbols from english alphabet!');
    }else if(password.length < 6){
        notify.showError('Password must be at least 6 symbols!');
    }else if(password === ''){
        notify.showError('Password myst be submitted!');
    }else if(password !== repeatPass){
        notify.showError('Both passwords must match!');
    }else {
        auth.register(username,password)
            .then(function(userData){
                auth.saveSession(userData);
                notify.showInfo('User registration successful.');
                ctx.redirect('#/cars');
            }).catch(notify.handleAjaxError);
    }
};

handlers.logoutUser = function(ctx){
    auth.logout()
        .then(() => {
            sessionStorage.clear();
            notify.showInfo('Logout successful.');
            ctx.redirect('#/home');
        }).catch(notify.handleAjaxError);
};

handlers.renderRegisterView = function(ctx){
    //this.partial('./templates/forms/register.hbs');

    ctx.loadPartials({
        header:'./templates/common/header.hbs',
        footer:'./templates/common/footer.hbs'
    }).then(function(){
        this.partial('./templates/forms/register.hbs');
    })
};

handlers.renderLoginView = function(ctx){
    ctx.loadPartials({
        header:'./templates/common/header.hbs',
        footer:'./templates/common/footer.hbs'
    }).then(function(){
        this.partial('./templates/forms/login.hbs');
    })
};
