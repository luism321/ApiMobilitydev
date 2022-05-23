const TypeRes = {
    json:{ 'Content-Type': "application/json",
    },
} 

const routes = {
    AddPreregister:'/',
    Verification:'/VerificationDoc',
    Register:'/Register',
    Login:'/Login',
    Update:'/Update',
    addBancos:'/AddBanco',
    updateBancos:'/UpdateBanco',
    deleteBancos:'/DeleteBanco'
}

module.exports= {
routes,
TypeRes,
}