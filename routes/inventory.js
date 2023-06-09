const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/productController');
const category_controller = require('../controllers/categoryController');
const section_controller = require('../controllers/sectionController');
const product_instance_controller = require('../controllers/productinstanceController');
const new_controller = require('../controllers/newController');

/// Product Routes ///

router.get('/', product_controller.index);

router.get('/product/create', product_controller.product_create_get);

router.post('/product/create', product_controller.product_create_post);

router.get('/product/:id/delete', product_controller.product_delete_get);

router.post('/product/:id/delete', product_controller.product_delete_post);

router.get('/product/:id/update', product_controller.product_update_get);

router.post('/product/:id/update', product_controller.product_update_post);

router.get('/products', product_controller.product_list);

router.get('/product/:id', product_controller.product_detail);

/// Category Routes ///

router.get('/category/create', category_controller.category_create_get);

router.post('/category/create', category_controller.category_create_post);

router.get('/category/:id/delete', category_controller.category_delete_get);

router.post('/category/:id/delete', category_controller.category_delete_post);

router.get('/category/:id/update', category_controller.category_update_get);

router.post('/category/:id/update', category_controller.category_update_post);

router.get('/categories', category_controller.category_list);

router.get('/category/:id', category_controller.category_detail);

/// Section Routes ///

router.get('/section/create', section_controller.section_create_get);

router.post('/section/create', section_controller.section_create_post);

router.get('/section/:id/delete', section_controller.section_delete_get);

router.post('/section/:id/delete', section_controller.section_delete_post);

router.get('/section/:id/update', section_controller.section_update_get);

router.post('/section/:id/update', section_controller.section_update_post);

router.get('/section/:id', section_controller.section_detail);

router.get('/sections', section_controller.section_list);

/// Product Instances Routes ///

router.get('/productinstance/create', product_instance_controller.productinstance_create_get);

router.post('/productinstance/create', product_instance_controller.productinstance_create_post);

router.get('/productinstance/:id/delete', product_instance_controller.productinstance_delete_get);

router.post('/productinstance/:id/delete', product_instance_controller.productinstance_delete_post);

router.get('/productinstance/:id/update', product_instance_controller.productinstance_update_get);

router.post('/productinstance/:id/update', product_instance_controller.productinstance_update_post);

router.get('/productinstances', product_instance_controller.productinstance_list);

router.get('/productinstance/:id', product_instance_controller.productinstance_detail);

/// New Route ///

router.get('/new', new_controller.new);

module.exports = router;

