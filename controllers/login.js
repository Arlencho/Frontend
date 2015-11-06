
exports.create=function(req,res){
		db('login').findOne({email: req.body.email, password: req.body.password},function(err,finded){
		if(err) console.log("error occurred\n"+err);
		else{
			if(finded){
				io.to(req.session.socket).emit('response',{'reply':"Found"});
				req.session.user.loggedIn=true;
				req.session.user.id=finded.id;
				req.session.user.firstName=finded.firstName;
				req.session.user.lastName=finded.lastName;
				req.session.user.email=finded.email;
				req.session.save(function(err) {
				  if (err) console.log(err);
				  else console.log("Session has been stored");
				});
			}
			else{
				io.to(req.session.socket).emit('response',{'reply':"Not Found Found"});
				console.log("user not found");
			}
		}
	});
res.redirect("/#/");
};

