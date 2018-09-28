const fs = require('fs');

module.exports = function generateCode (code1, code2){
    code2 = code2 || ""
    let generateCode = code1 + '\n' + code2
    
    fs.writeFile("generated.js", generateCode, function(err) {
      if(err) {
          return console.log(err);
      }
  
      console.log("The file was generated!");
  }); 
  }
