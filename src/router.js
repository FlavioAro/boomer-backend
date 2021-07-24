//* Import the company.routes file with all de methods
import companyRoutes from './routes/company.routes';

//* Here I defined the first endpoint
const router = (app) => {
    app.use('/company', companyRoutes);
};

export default router;