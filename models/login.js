module.exports = {

  identity: 'login',
  
connection: 'mysqlDB',
  schema:true,
   migrate: 'alter',
  //
 /* connection: 'mongoDB',
  schema:false,
  migrate: 'alter',
  *///////
  attributes: {
	firstName: 'string',
	lastName: 'string',
    phone: 'string',
	email: 'string',
	password: 'string'
  }   
};
