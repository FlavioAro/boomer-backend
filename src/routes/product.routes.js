//* Import express and initialize the routers
import express from 'express';
const router = express.Router();

//* Call the controller with the methods
import { getProduct, getProductById, createNewProduct, updateProduct, deleteOneProduct, deleteAllProduct } from '../controllers/productController'

//* Here I defined the methods 
router.get('/', getProduct); //localhost:5000/product
router.get('/:id', getProductById); //localhost:5000/product/1
router.post('/', createNewProduct); //localhost:5000/product
router.put('/:id', updateProduct); //localhost:5000/product/1
router.delete('/:id', deleteOneProduct); //localhost:5000/product/1
router.delete('/delete', deleteAllProduct); //localhost:5000/product/delete

export default router;