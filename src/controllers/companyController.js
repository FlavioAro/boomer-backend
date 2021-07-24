import dbConnection from '../database/dbConnection';

export const getCompany = (req, res) => {

    let sqlQuery = 'SELECT id, company_name, segment, street_and_number, district, city, state, comments FROM company';

    dbConnection.query(sqlQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

export const getCompanyById = (req, res) => {

    const id = parseInt(req.params.id);
    let sqlQuery = `SELECT id, company_name, segment, street_and_number, district, city, state, comments FROM company WHERE id = ${id}`;

    // This method verifies that the id passed by parameter is a number, if it is not, it sends an error messdistrict
    if (isNaN(id)) {
        return res.json('You must enter a valid id as a parameter');
    }

    dbConnection.query(sqlQuery, (error, result) => {
        if (error) throw error;
        res.status(200).json(result[0]);
    });
};

export const createNewCompany = (req, res) => {

    // Declare that I store the request body in a constant
    const company = req.body;
    // So, I create the object with the table fields by calling the constant company
    const companyObj = [
        company.company_name,
        company.segment,
        company.street_and_number,
        company.district,
        company.city,
        company.state,
        company.comments
    ];

    // This method verifies that the request body has all the complete fields, otherwise the operation will not be executed and sends an error messdistrict
    if (!company.company_name || !company.segment || !company.street_and_number || !company.district || !company.city || !company.state) {
        return res.json({
            ErrorCode: 204,
            Messdistrict: 'Fields cannot be empty'
        });
    }

    let sqlQuery = 'INSERT INTO company (company_name, segment, street_and_number, district, city, state, comments) VALUES ( ?,?,?,?,?,?,? )';

    dbConnection.query(sqlQuery, companyObj, (err, result) => {
        if (err) throw err;
        res.status(201).json('Company created with id: ' + result.insertId);
    });
};

export const updateCompany = (req, res) => {
    
    const id = parseInt(req.params.id);
    const company = req.body;
    const companyObj = [
        company.company_name,
        company.segment,
        company.street_and_number,
        company.district,
        company.city,
        company.state,
        company.comments
    ];

    if (isNaN(id)) {
        return res.json('You must enter a valid id as a parameter');
    }

    if (!company.company_name || !company.segment || !company.street_and_number || !company.district || !company.city || !company.state) {
        return res.json({
            ErrorCode: 204,
            Messdistrict: 'Fields cannot be empty'
        });
    }

    let sqlQuery = `UPDATE company SET company_name = ?, segment = ?, street_and_number = ?, district = ?, city = ?, state = ?, comments = ? WHERE id = ${id}`

    dbConnection.query(sqlQuery, companyObj,  (error, result) => {
        if (error) throw error;
        if (result.affectedRow === 0) {
            res.send('No company was updated');
        }
        res.json(`Company with id ${id} updated successfully`);
    });
};

export const deleteOneCompany = (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.json('You must enter a valid id as a parameter');
    }
    
    let sqlQuery = `DELETE FROM company WHERE id = ${id}`;

    dbConnection.query(sqlQuery, error => {
        if (error) throw error; 
        res.status(200).json(`Company with id ${id} deleted successfully`);
    });
};

export const deleteAllCompany = (req, res) => {

    let sqlQuery = 'TRUNCATE TABLE company';

    dbConnection.query(sqlQuery, error => {
        if (error) throw error; 
        res.status(200).json('All records have been erased');
    });
};