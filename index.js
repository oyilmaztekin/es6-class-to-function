const babylon = require('babylon');
const babelGenerator = require('babel-generator');
const traverse = require("babel-traverse").default


"use strict";

(function(){
    
    let code = `class Deneme{
        constructor(a,b,c){
          this.a = a;
          this.b = b;
          this.c = c;
        }
          method1(){
        }
      }`

    const ast = babylon.parse(code);
    let classM = {}
    let outputFunc;
    let protoFunc = `Deneme.prototype.methodName = function(){}`
    let protoAst = babylon.parse(protoFunc)
    debugger;
    traverse(ast, {
        Program: function(path) {
          var node = path.container
          try {
            //token toplama işlemi
          } catch (Error) {
            console.log(Error)
          }
        },
        ClassMethod: function(path) {
            const node = path.node
            try {
              //collect constructor method and change method name as a function 
              node.kind === "constructor" ? classM = path.node : null
              classM.key.name = "function"
              outputFunc= babelGenerator.default(classM, { /* options */ }, code);

              // TODO: şimdi node.kind = method olanı tespit et ve metodun ismini al .
              // functionScope = node.body 
              // protoFunc içerisini node.body node.name ve BlockStatement olarak doldur
              // protoFunc ast to code
            } catch (Error) {
              console.log(Error)
            }
          }
      })

})()
