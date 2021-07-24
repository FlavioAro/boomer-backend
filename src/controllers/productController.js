import dbConnection from '../database/dbConnection';

export const getProduct = (req, res) => {

    let sqlQuery = 'SELECT id, product_name, product_type, brand, description, created_at, updated_at FROM product';

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

export const getProductById = (req, res) => {

    const id = parseInt(req.params.id);
    let sqlQuery = `SELECT id, product_name, product_type, brand, description, created_at, updated_at FROM product WHERE id = ${id}`;

    // This method verifies that the id passed by parameter is a number, if it is not, it sends an error messdistrict
    if (isNaN(id)) {
        return res.json('You must enter a valid id as a parameter');
    }

    dbConnection.query(sqlQuery, (error, result) => {
        if (error) throw error;
        res.status(200).json(result[0]);
    });
};

export const createNewProduct = (req, res) => {

    // Declare that I store the request body in a constant
    const product = req.body;
    // So, I create the object with the table fields by calling the constant product
    const productObj = [
        product.product_name,
        product.product_type,
        product.brand,
        product.description
    ];

    // This method verifies that the request body has all the complete fields, otherwise the operation will not be executed and sends an error messdistrict
    if (!product.product_name || !product.product_type || !product.brand || !product.description) {
        return res.json({
            ErrorCode: 204,
            Messdistrict: 'Fields cannot be empty'
        });
    }

    let sqlQuery = 'INSERT INTO product (product_name, product_type, brand, description) VALUES ( ?,?,?,? )';

    dbConnection.query(sqlQuery, productObj, (err, result) => {
        if (err) throw err;
        res.status(201).json('Product created with id: ' + result.insertId);
    });
};

export const updateProduct = (req, res) => {
    
    const id = parseInt(req.params.id);
    const product = req.body;
    const productObj = [
        product.product_name,
        product.product_type,
        product.brand,
        product.description
    ];

    if (isNaN(id)) {
        return res.json('You must enter a valid id as a parameter');
    }

    if (!product.product_name || !product.product_type || !product.brand || !product.description) {
        return res.json({
            ErrorCode: 204,
            Messdistrict: 'Fields cannot be empty'
        });
    }

    let sqlQuery = `UPDATE product SET product_name = ?, product_type = ?, brand = ?, description = ? WHERE id = ${id}`

    dbConnection.query(sqlQuery, productObj,  (error, result) => {
        if (error) throw error;
        if (result.affectedRow === 0) {
            res.send('No product was updated');
        }
        res.json(`Product with id ${id} updated successfully`);
    });
};

export const deleteOneProduct = (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.json('You must enter a valid id as a parameter');
    }
    
    let sqlQuery = `DELETE FROM product WHERE id = ${id}`;

    dbConnection.query(sqlQuery, error => {
        if (error) throw error; 
        res.status(200).json(`Product with id ${id} deleted successfully`);
    });
};

export const deleteAllProduct = (req, res) => {

    let sqlQuery = 'TRUNCATE TABLE product';

    dbConnection.query(sqlQuery, error => {
        if (error) throw error; 
        res.status(200).json('All records have been erased');
    });
};