
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
 * 실행 순서는 일반 javascript 들의 선언을 순서대로 실행한 뒤
 *   script type="module" 들을 선언한 순서대로 실행함.
 * 
*/

// 1. closure 방식 :  count 변수를 독립적으로 사용
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
console.log( 'fnClosure: ', fnClosure() );   // count 가 증가됨



// Global scope 
   // Module scope
      // Function scope
         // Block scope


// ----------------------------------------------------------------------------------------
// 2. IIFE( Immediately Invoked Function Expression ) 를 사용한 전역변수 충돌 방지지
// - IIFE() 함수 안에 선언하여 한 번 실행되고 소멸(전역 충돌 X).
// window 객체에 사용자 정의 UserModule 객체 추가
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

   console.log( 'IIFE fight: ', fight( herry, voldmort ) );
}
)();


// script1.js
(function() {
   // Variables are scoped to this function
   let user = "John";
   let data = { id: 1 };
   
   // Only expose what's needed to global scope : window 객체의 하위 객체로 사용자 정의 객체를 추가
   window.UserModule = {                        // window 객체에 사용자 정의 UserModule 객체 추가
       getUser: function() { return user; }
   };
})();

// script2.js
(function() {
   // Can safely use same variable names
   let user = "Jane";  // No conflict with script1's user
})();

console.log( 'IIFE UserModule.getUser(): ', UserModule.getUser());


// ----------------------------------------------------------------------------------------
// 3. Module Pattern : 객체형식으로 외부 공개 함수 반환
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

console.log( 'Module Pattern fightModule.fight(): ', fightModule.fight( 'Merry', 'Jane' ) );


// user-module.js
// payment-module.js

// UserModule2.addUser( "Jane" );
// console.log( 'UserModule2.getUsers(): ', UserModule2.getUsers() );


// ----------------------------------------------------------------------------------------
// 4. ES6 module :
//  
// - 선언:  <script type="module" src="module1.js"></script>
// - type="module" 을 사용하면 전역변수로는 사용할 수 없고, import 한 module 내에서만 사용 가능.
//
// - 단일 함수 공걔 :  개별 함수 앞에 export 키워드를 붙이면 외부에서 사용할 수 있는 함수로 선언. 
// - 복수 함수 공개 :  export { 함수명1, 함수명2, ... }
// - default 함수 공개 :  export default 함수명
// - ES6 module 단일 호출 사용 :  import ~ from 으로 외부 module 호출
// - ES6 module 복수개 호출 사용 :  import { 함수명1, 함수명2, ... } from 'module1'
// - ES6 module 충돌 방지를 위한 이름 변경 사용 :  import { 함수명1 as 함수명2, ... } from 'module1'
// - 호출 순서 정의를 위한 common.js 사용
// - module object 생성 사용: module 에 대한 namespace 를 사용하여 접근 가능.
// - Aggregating modules 사용: 여러 module을 하나의 module로 통합하여 사용 가능.

// module1.js
// module2.js
// module-rename.js
// common.js
// module-object-creation.js
// aggregating-module.js





// ----------------------------------------------------------------------------------------

// 5. commonJS module - javascript 간의 호출 순서 문제 해결
// 
// - 상대경로를 사용하여 다른 모듈 호출
// - 동적으로 모듈을 로드할 수 있음 (조건부 로딩 가능)
// - 필요한 시점에만 모듈을 로드하여 메모리 사용량을 줄일 수 있음
// - 모듈 캐싱을 통한 성능 최적화
// - 실행 환경에 따른 다른 구현 선택 가능
//
// 내보내기
//    module.exports = { function1, function2 };
// 가져오기
//    const module = require('./module');

// CommonJS 모듈 예제 - 사용자 서비스
// user-service.js      // 선언 및 module.export
// payment-service.js   // 선언, require, module.export
// common-js.js         // 복수개의 module 호출


// CommonJS 모듈 예제 - 동적인 module 호출
// ./dynamic-commonjs/paypal-payment.js
// ./dynamic-commonjs/stripe-payment.js
// ./dynamic-commonjs/dynamic-payment-service.js      // 조건 동적 호출, 환경 동적 호출 
// ./dynamic-commonjs/dynamic-payment-example.js