// 3. commonJS module - javascript 간의 호출 순서 문제 해결
// 모든 script들을 하나의 script로 통합( browserify script.js > bundle.js )

import { fight as fight1 } from './module1.js';                      // ES6 module 호출:  ES6 module 복수개 호출 사용 
import sayHello, { voldmort, fight as fight2 } from './module2.js';  // ES6 module 호출:  ES6 module 복수개 호출 사용


// var module1 = require( './module1' ); // .fight       require() 로 다른 module( .js ) 호출
// var module2 = require( './module2' ); // .importedFunc

function fight(params) {
   // 또 다른 자신 만의 fight 함수 정의 가능
   console.log( 'commonsjsparams: ', params);
}

export  // exports 로 복수 함수 외부 공개 선언
{
   fight1,
   voldmort,
   fight2,
   sayHello
};