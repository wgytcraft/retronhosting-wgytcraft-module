fs = require('fs-extra')
module.exports = function (host, res, req, error, version, ejs, config) {
    /*!
        retronhosting in wgytcraft
        licensed under the mit license, 2021 William Horning (@wgyt)
        retronhosting is owned by @retronbv
    */
   var dirname = config.pagedir  // config file
   var page404 = config["404"]  //  see setup.md
   doesitexist = fs.pathExists(`${dirname + res.url}.html`, (err, exists) => {console.log(err);return exists;})
   if (res.url.startsWith('/static/')){
       if(doesitexist){
           res.writeHead(200)
           res.write(fs.readFileSync(`${dirname + res.url}`, "utf8"))
       }else{
           res.writeHead(404)
           res.write('404')
       }
   }else{
       if (doesitexist){
           res.writeHead(200)
           res.write(fs.readFileSync(`${dirname + res.url}.html`, "utf8"))
       }else{
        res.writeHead(404)
        res.write(fs.readFileSync(`${dirname + page404}.html`), "utf8")
       }    
   }
   res.end()
}
