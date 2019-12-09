const {company, engineer} = require('./controllers');

module.exports = app => {
    app.get('/api/v1/companies', company.data);
    app.post('/api/v1/companies', company.add);
    app.put('/api/v1/companies', company.update);
    app.delete('/api/v1/companies', company.delete);
    
    app.get('/api/v1/engineer', engineer.data);
    app.post('/api/v1/engineer', engineer.add);
    app.put('/api/v1/engineer', engineer.update);
    app.delete('/api/v1/engineer', engineer.delete);
};