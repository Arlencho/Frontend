exports.index=function(req,res){
	if(!req.session.user)
	{
	req.session.user={};
	}
	if(req.session.user)
	req.session.data={};
	if(req.session.user.email!=null)
	{
		if(req.session.user.loggedIn==true)
		{
			res.sendfile("views/admin/index.html");
		}
	}
	else
	{
		res.sendfile("views/public/index.html");
	}
};
exports.create=function(req,res){
	console.log("create function called");
	if(req.body.firstName != null && req.body.lastName != null && req.body.email !=null){
		db('login').find({email: req.body.email},function(err,finded){
		if(err) console.log("error occurred\n"+err);
		else{
			if(finded.length==0){		
				db('login').create(req.body,function(err,model){
					if(err){
						console.log("error occurred\n"+err);
					}
					else{
						console.log("user created");
					}
				});
			}
			else{
				console.log("user already exist");
			}
	}
		});
	}
	else{
		console.log("no data found");
	}
res.redirect("/");
};
exports.logout= function(req,res){
console.log("Log Out");
req.session.user={};
res.redirect('/');
};



exports.store_session= function(req,res){
console.log("\n\n\n\n**********************************\n\nSession Setting function is called\n\n");
console.log("session");
console.log(req.session);
req.session.socket=req.body.msg;

res.redirect('/');

console.log("End of Store Session function\n\n");
};