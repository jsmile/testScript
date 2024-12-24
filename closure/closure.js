// var count = 0;     //  전역변수
// function counter() 
// {
//    count = count + 1;
//    return count;
// }
// console.log( counter() );
// console.log( counter() ); 

// 1. 함수 closure
function makeCounter() {
    var count = 0;

    function counter() {
        count = count + 1;
        return count;
    };

   return counter;   
}
var doCount = makeCounter();
console.log( '함수용 크로저 count: ', doCount() );


// 2. 함수 parameter에 의한 closure
function makeTimer( myMessage, secounds ) 
{
   setTimeout( 
      function() {                      // function parameter
         alert( myMessage );          //  myMessage : free variable 
      }
      , secounds * 1000
   );
}

// 3. 이벤트에서 closure 사용 
window.onload = function() {

   var count = 0;
   var messageDiv = document.getElementById( 'message' );
   var button = document.getElementById( 'clickme' );

   button.onclick = function( e ) {
      count++;
      messageDiv.innerHTML = 'Click count: ' + count;
   }
}