//* Import the routes file with all de methods
import companyRoutes from './routes/company.routes';
import productRoutes from './routes/product.routes';

//* Here I defined the first endpoint
const router = (app) => {
    app.use('/company', companyRoutes);
    app.use('/product', productRoutes);
};

export default router;