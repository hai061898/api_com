const { Router } = require('express');
const { check } = require('express-validator');
const { createUsers } = require('../controller/register_controller');
const { ValidatedAuth } = require('../middlewares/validate_auth');
const { LoginUsuario, RenweToken } = require('../controller/login_controller');
const { validateToken } = require('../middlewares/validate_token');
const { changeFotoProfile, userPersonalRegister, getPersonalInformation, updateStreetAddress } = require('../controller/user_controller');
const { uploadsProfile } = require('../helpers/multer');
const { HomeCarouselSilder, ListCategoriesHome, ListProductsHome, ListCategoriesAll } = require('../controller/home_controller');
const { addFavoriteProduct, productFavoriteForUser, saveOrderProducts, getPurchasedProducts, getProductsForCategories } = require('../controller/poduct_controller');

const router = Router();


router.post( '/api/register', [
    check('username', 'Username is required').not().isEmpty(),
    // kiểm tra biến user không đc trống 
    check('email', 'Email Address is required').isEmail(),
    // kiểm tra biến email xem nó đúng là email k (hàm isEmail())
    check('passwordd', 'Password is required').not().isEmpty(),
    ValidatedAuth
    // nếu nó không thuộc lỗi các trường hợp trên thì hiện lỗi ValidatedAuth (tức 1 lỗi gì đó)
], createUsers ); // gọi hoạt đông reateUsers  từ controller

router.post('/api/login', [
    check('email', 'Email ID is required').isEmail(),
    check('passwordd', 'Password is required').not().isEmpty(),
    ValidatedAuth
], LoginUsuario );

router.put('/api/personal/register', validateToken, userPersonalRegister );
// put như là phương edit (link route , kiểm tra token, gọi hàm )
router.put('/api/update-street-address', validateToken, updateStreetAddress );


router.get('/api/get-personal-information', validateToken, getPersonalInformation);

router.get( '/api/login/renew', validateToken, RenweToken);

router.put('/api/update-image-profile', [validateToken, uploadsProfile.single('image')], changeFotoProfile);

// Router Home 
router.get('/api/home-carousel', validateToken, HomeCarouselSilder);
router.get('/api/list-categories', validateToken, ListCategoriesHome );
router.get('/api/list-products-home', validateToken, ListProductsHome);

// Router Categories
router.get('/api/list-categories-all', validateToken, ListCategoriesAll);

// Products
router.post('/api/add-Favorite-Product', validateToken, addFavoriteProduct );
router.get('/api/product-favorite-for-user', validateToken, productFavoriteForUser);
router.post('/api/save-order-products', validateToken, saveOrderProducts );
router.get('/api/get-purchased-products', validateToken, getPurchasedProducts );
router.get('/api/get-products-for-categories/:id', validateToken, getProductsForCategories );

 // phần này là phần thêm của mongo 
router.get('/api/add-home-carousel' , AddhomeCarousel);
router.get('/api/add-category-static' , addCategoryStatic);
router.get('/api/add-products-static' , addProductsStatic);

module.exports = router ;    