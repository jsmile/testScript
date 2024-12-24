/**
 * this
 * - this within an object:  정의된 객체  
 * - implicit:  별도의 객체없이 함수 내에서 선언되면 window.
 * - explicit:  bind( this ) 를 사용하여 현재 객체를 this 에 고정정
 * - arrow function:  this 가 선언된 arrow function 의 parent 객체 
*/


// 1. within a object 
const obj = {
   name : 'Billy', 
   sing : function() {
      return 'la la la, ' + this.name;       // la la la, Billy
   },
   singAgain :  function() {
      console.log( this.sing() + ' !' )
   }
}
obj.singAgain();


// 2. implicit
function a () { 
   console.log( 'a: ', this );               // 일반 함수 안에서의 this :  window 가 호출하는 것이므로 window
}
window.a()      // Window 와 동일함.

const a1  = function ()                      // function expression
{
   console.log( 'a1: ', this );              // 객체없는 함수 안의 this: Window
   const b = function() 
   {
      console.log( 'b: ', this );            // 객체없는 함수 안의 this: Window
      const c = 
      {
         hi: function() 
         {
            console.log( 'c: ', this );      // 객체 안에 선언된 함수의 this: 객체 c
         }
      }
      c.hi();                                 // c 가 호출하므로 this 는 c
   }
   b();                                       // 호출하는 객체가 없으므로 this 는 Window
}
a1();                                          // 호출하는 객체가 없으므로 this 는 Window


// 3. bind( this ) 로 객체 고정
const obj2 = {
   name: 'July',
   sing() {
      console.log( 'obj2: ', this );               // object method 의 this:  obj2
      var anotherFunc = function () {
         console.log( 'b: ', this );               // function 안의 this:  window
      }
      // anotherFunc();                            
      return anotherFunc.bind( this );             // anotherFunc 의 호출객체를 obj2 로 고정시킴 --> this: obj2
   }
}
// obj2.sing();
obj2.sing()();


// 4. arrow 함수의 parent object

   //  a function in a function : By a arrow function( lexical scope )
   const obj3 = {
      name: 'Billy',
      sing() {
         console.log( 'a3: ', this );              // method 의 this:  obj3
         var anotherFunc = () => {                 // arrow function make a lexical scope
            console.log( 'b3: ', this );           // obj3 : 선언된 곳의 parent object
         }
         anotherFunc();
      }
   }
   obj3.sing();

   // cf) a function in a function : By outer variable
   const obj4 = {
      name: 'Tom',
      sing() {
         console.log( 'a4: ', this );               // obj
         var self = this
         var anotherFunc = function () {
            console.log( 'b4: ', self );            // variable chaining 를 이용하여여 this 전달:  obj
         }
         anotherFunc();
      }
   }
   obj4.sing() ;



/**
 * 다른 객체의 함수를 활용하기
 * - call():  param 1개
 * - apply():  param 복수개
 * - bind():  객체 고정
*/

const wizard = {
   name : 'Merlin', 
   health : 100, 
   heal( num1, num2 ) {
      return this.health = num1 + num2;
   }
}

const archer = {
   name: 'Robin hood', 
   health: 30
}
console.log( archer );
wizard.heal.call( archer, 50, 30 );                // archer 객체가가 wizard 객체의 heal() 함수를 빌려서 사용함.
console.log( 'call(): ', archer );                 // archer{ name: 'Robin hood', health: 110 }

const tanker = {
   name: 'Alex', 
   health: 20
}
console.log( archer );
wizard.heal.apply( archer, [ 50, 30 ] );           // tanker 객체가 wizard 객체의 heal() 함수를 빌려서 사용 : array parameter
console.log( 'apply(): ', archer );                // archer{ name: 'Robin hood', health: 100 }

const array = [1,2,3];
// in this case, the 'this' keyword doesn't matter!
function getMaxNumber(arr){
  return Math.max.apply( null, arr );        // null :  주어객체가 중요하지 않고 함수기능만 실행
}
getMaxNumber(array)

const ninza = {
   name: 'Smith', 
   health: 30
}
console.log( ninza );
const healKiller = wizard.heal.bind( ninza, 50, 30 );    // wizard 객체의 heal() 함수를 복사하여 저장했다가 재실행시 사용됨.
console.log( 'bind(): ', archer );                       // ninza{ name: 'Robin hood', health: 30 } : 그 자체는 변화가 없고 새함수 반환
healKiller();                                            // ninza{ name: 'Robin hood', health: 100 }
console.log( ninza );


function fn_getBaseValue() 
{
  return {
    "PBAN_YR" : "${PBAN_YR}",
    "PBAN_MMNT_CODE" : "${PBAN_MMNT_CODE}",
    "PBAN_MMNT_CODE_NM" : "${PBAN_MMNT_CODE_NM}",
    "PBAN_INSTT_CODE" : "${PBAN_INSTT_CODE}",
    "PBAN_INSTT_CODE_NM" : "${PBAN_INSTT_CODE_NM}",
   //  "PBAN_INPUT_SNO" : _vPbanInputSno,
    "VIEW_SE": "${VIEW_SE}",
    "MOD_SE": "${MOD_SE}",
    "PBAN_BASE": "${PBAN_BASE}",
    "SBMT_YN_Y_COUNT": "${SBMT_YN_Y_COUNT}",
    "SBMT_YN_N_COUNT": "${SBMT_YN_N_COUNT}",
    "SAVE_CNT": "${SAVE_CNT}",
    "PBAN_PERIOD_CNT": "${PBAN_PERIOD_CNT}",
    "VIEW_CODE": "${VIEW_CODE}",
    "SBMT_YN_I_COUNT": "${SBMT_YN_I_COUNT}"
  };
}
console.log( 'fn_getBaseValue: ', fn_getBaseValue());
var paramViewSe = fn_getBaseValue()["VIEW_SE"];
console.log( 'fn_getBaseValue(): ', paramViewSe);
var fnBaseValue = fn_getBaseValue();
fnBaseValue["VIEW_SE"] = 'test';
paramViewSe = fnBaseValue["VIEW_SE"];
console.log( 'baseValue["VIEW_SE"]: ', paramViewSe);    // test