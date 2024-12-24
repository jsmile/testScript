/**
 * Scope Chain
 * - all functions can access variables in a parent's Variable Environment
 * - a function access a local variable environment.
 *              and then( 찾는 변수가 없을 때만 ) variables in its parent's variable environment.
 *              실행위치가 아닌 선언된 위치의 부모에 만약 찾는 변수가 있으면 ( var 변수는 사용 전에 선언이 없으면 ) undefined로 초기화된다.
*/


var x = 'x';
function printName()                 // 선언된 위치
{
   var c = 'c';
   console.log( 'b : ', b );        //  error :  b is not defined :  no scope chain : 선언된 위치의 부모에 b 가 없음.
   console.log( 'x : ', x );        //  x :  variable in a parent environment :  scope chain
   console.log( 'Jsmile' );
}

function findName() 
{
   var b = 'b';
   printName();                  // 실행 위치
}

function sayName() 
{
   var a = a;
   console.log( x );             //  x :  variable in a parent environment :  scope chain
   findName();
}
sayName();                      // *** 상위가 아닌 override 된 하위의 function sayName() 이 실행됨.


// function sayName() 
// {
//    var a = 'a';
//    return function findName() 
//    {
//       var b = 'b';
//       return function printName() 
//       {
//          console.log( 'a', a );               // parent findName() -> parent sayName() :   Scope Chain
//          console.log( 'Jsmile' );
//       }      
//    }
// }
// sayName()()();                               //  () :  sayName,    ()() :  findName,    ()()() :  printName
