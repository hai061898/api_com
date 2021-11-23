const { response } = require('express');
const Category = require('../Models/category');
const Carousel = require('../Models/home_carouse');
const Products = require('../Models/Products');


const HomeCarouselSilder = ( req, res = response ) => {


    Carousel.find({}).exec((err, carousel) => {
        // find giống findone nhưng nó trả về nhiều giá trị , exec  dùng để kiểm tra xem trong một chuỗi có chứa chuỗi con nào khớp với mô hình chuỗi của biểu thức chính quy hay không.
        if( err ){
            return res.status(400).json({
                resp: false,
                msj: "error: Without List of images",
                err
            });
        }

        res.json({
            resp: true,
            msj: 'List Images - Home ',
            slider: carousel
        });

    });
    

}


const ListCategoriesHome =  async ( req, res = response ) => {


    Category.find({})
            .limit(10) // trả về 10 giá trị         
            .exec((err, listCategories) => {

        if( err ){
            return res.status(400).json({
                resp: false,
                msj: "error: Without List of Categories",
                err
            });
        }

        res.json({
            resp: true,
            msj : 'List categories',
            categories : listCategories
        });

    });

}


const ListProductsHome = async ( req, res = response ) => {


    Products.find({})
            .populate('category_id', 'category') // populate tạo đường dẫn liên kết các document 
            .limit(10)
            .exec((err, productsdb) => {


                if( err ){
                    return res.status(500).json({
                        resp: false,
                        msj : 'Error: Without List Products' 
                    });
                }

                res.json({
                    resp: true,
                    msj : 'List Products Home',
                    products: productsdb 
                });

            });
}


const ListCategoriesAll = async ( req, res = response ) => {


    Category.find({})    
            .exec((err, listCategories) => {

        if( err ){
            return res.status(400).json({
                resp: false,
                msj: "error: Without List of Categories",
                err
            });
        }

        res.json({
            resp: true,
            msj : 'List Categories All',
            categories : listCategories
        });

    });
}




module.exports = {
    HomeCarouselSilder,
    ListCategoriesHome,
    ListProductsHome,
    ListCategoriesAll
}