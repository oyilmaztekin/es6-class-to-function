const babylon = require('babylon');
const babelGenerator = require('babel-generator');
const traverse = require("babel-traverse").default
const generateCode = require('./generateCode.js')

"use strict";

(function(){
    let code = `class Deneme{
        constructor(a,b,c){
          this.a = a;
          this.b = b;
          this.c = c;
        }
          method1(){
            return this.a + this.b + this.c;
        }
      }
      class Deneme2{
        method2(){
            return 'hello from ast'
          }
      }`

    const ast = babylon.parse(code);
    let classM = {};
    let classC = {};
    let outputFunc;
    
    // Prototype method templates
    let protoFunc = `Deneme.prototype.methodName = function(param){}`
    let protoAst = babylon.parse(protoFunc)

    //function children
    let params = [];
    let className = "";
    let methodScope = {};
    let methodCode = {}

    traverse(ast, {
        ClassMethod: function(path) {
            const node = path.node
            try {
              if(node.kind === "constructor") {
                className = path.parentPath.container.id.name;
                classC = path.node
                params = classC.params.map(el => el.name) 
                classC.key.name = `function ${className}`
                outputFunc= babelGenerator.default(classC, { /* options */ }, code);
                // generateCode(outputFunc.code)
              }

              if(path.parentPath.parent.id.name === className && node.kind === "method") {
                classM = path.node;
                methodScope = classM.body;
                
                protoAst.program.body[0].expression.left.object.object.name = className;
                protoAst.program.body[0].expression.left.property.name = classM.key.name
                protoAst.program.body[0].expression.right.body = methodScope;
                params = params.toString()
                protoAst.program.body[0].expression.right.params[0].name = params
                methodCode = babelGenerator.default(protoAst, { /* options */ }, methodCode);

                if(outputFunc.code && methodCode.code) {
                  generateCode(outputFunc.code, methodCode.code)
                }
              }

            } catch (Error) {
              console.log(Error)
            }
          }
      })

})()
