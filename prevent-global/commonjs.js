// 3. commonJS module - javascript 간의 호출 순서 문제 해결
// 모든 script들을 하나의 script로 통합( browserify script.js > bundle.js )

var module1 = require( './module1' ); // .fight       require() 로 다른 module( .js ) 호출
var module2 = require( './module2' ); // .importedFunc

function fight(params) {
   // 또 다른 자신 만의 fight 함수 정의 가능
}

module.exports =   // module.exports 로 외부 공개 함수 반환 
{
   fight: fight
};