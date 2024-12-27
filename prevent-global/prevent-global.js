
/**
 * 각각의 js 에서 전역변수의 중복사용에 대한 문제를 해결하기 위해 Module 를 사용하는 것이 바람직 하다.
 * 
 * 전역 변수의 중복사용방지에는 
 *    1.Closure( 사용변수 은익  : 함수 return, 함수 param, 이벤트 handler ) 
 *       < 2. param 있는 IIFE 함수( 전역변수에게 영향을 주지 않음  ) 
 *       < 3. Module Pattern( 공개하고 싶은 것만 객체로 return 함 ) 
 *       < 4. ES6 module pattern( import~from, export default 함수명, export 함수명 )  
 *       < 5. commonJS module(  실행순서 문제 해결 : require(), module.exports {객체} )
 * 
*/

// closure 방식 :  count 변수를 독립적으로 사용
function makeCounter() 
{
   var count = 0;
 
   function counter() 
   {
       count = count + 1;
       return count;
   }
   
   return counter;     //  함수반환 closure : 함수 + 종료된 함수의 지역변수 count 에 접근할 수 있는 환경
}
 
var fnClosure = makeCounter();
console.log( fnClosure() );   // count 가 증가됨



// Global scope 
   // Module scope
      // Function scope
         // Block scope

// 1. IIFE( Immediately Invoked Function Expression ) 를 사용한 전역변수 충돌 방지지
// - IIFE() 함수 안에 선언하여 한 번 실행되고 소멸(전역 충돌 X).
(function() 
{
   var herry = 'potter';
   var voldmort = 'devil';

   function fight(char1, char2) 
   {
      var attack1 = Math.floor(Math.random() * char1.length);
      var attack2 = Math.floor(Math.random() * char2.length);

      return attack1 > attack2 ? `${char1} wins` : `${char2} wins`;
   }

   console.log( fight( herry, voldmort ) );
}
)();
         

// 2. Module Pattern : 객체형식으로 외부 공개 함수 반환
const fightModule = (function() 
{
   var herry = 'potter';
   var voldmort = 'devil';
   
   function fight(char1, char2) 
   {
      var attack1 = Math.floor(Math.random() * char1.length);
      var attack2 = Math.floor(Math.random() * char2.length);

      console.log( '*** inner variable is available : ', herry, voldmort );

      return attack1 > attack2 ? `${char1} wins` : `${char2} wins`;
   }

   return {  // 외부 공개 함수 반환
      fight: fight
   }

} )();

console.log( fightModule.fight( 'Merry', 'Jane' ) );


// 3. module 를 사용하여 외부로 함수 공개
// modeul1.js


// 4. ES6 module pattern :  함수 앞에 export 키워드를 붙이면 외부에서 사용할 수 있는 함수로 선언. 
// module2.js


// 5. commonJS module - javascript 간의 호출 순서 문제 해결
// 모든 script들을 하나의 script로 통합( browserify script.js > bundle.js )
// commonjs.js

var module1 = require( './module1' ); // .fight       require() 로 다른 module( .js ) 호출
var module2 = require( './module2' ); // .importedFunc