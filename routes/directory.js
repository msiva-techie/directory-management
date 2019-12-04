const express = require('express');
const router = express.Router();
const fs = require('fs');

function getFiles(source,res){
	let files = fs.readdirSync(source), 
		result = res;
	for(file of files){
		let dirName = `${source}/${file}`;
		if(fs.statSync(dirName).isDirectory()){
			getFiles(dirName,result)
		}else{
			result.push(dirName.toLowerCase());
		}
	}
	return result;
}

router.post('/compare', function compare(req, res) {	
try{
	let fromDirectoryFiles = getFiles(req.body.fromDirectory,[]);
	let toDirectoryFiles = getFiles(req.body.toDirectory,[]);
	let result = [], f;
	for(let i=0; i < fromDirectoryFiles.length; i++){
		f=0;
		for(let j=0; j < toDirectoryFiles.length; j++){
			if(fromDirectoryFiles[i].substring(req.body.fromDirectory.length) 
				=== toDirectoryFiles[j].substring(req.body.toDirectory.length)){
					f=1;
			}
		}
		if(f===0){
			result.push(fromDirectoryFiles[i]);
		}
	}
	res.jsonp({
		additionalFiles:result
	});
} catch(err) {
	res.jsonp({
		message:'some error occured',
		err
	});
}
});

router.post('/delete', function compare(req, res) {	
	try{
		req.body.files.forEach((file) => {
			fs.unlinkSync(file);
		})
		res.jsonp({
			message:'Files deleted'
		});
	} catch(err) {
		res.jsonp({
			message:'some error occured',
			err
		});
	}
	});

module.exports = router;
