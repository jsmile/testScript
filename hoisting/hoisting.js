/**
 * Hoisting
 * - var( global variables ) and function declaration is moving upto the top of a excution context.
 * - var is partially hoisted, 'undefined'.
 * 
 * - function declaration is fully hoisted.
 * - hoisted variables stored onto a heap memory.
*/


console.log( '1………………' );
// var teddy = undefined;              // hoisting a var variable 
// function sing() {                   // hoisting a function declaration 
//    console.log( 'la la la' );
// }

console.log( teddy );               // undefined
console.log( sing() );              // la la la
var teddy = 'bear';
function sing() {                   // hoisting a function declaration 
   console.log( 'la la la' );
}

// overriding
var a = 1;
var a = 2;
console.log( a );                   // 2  :  override previous var a

function b () {
   console.log( 'hi' )
}
b();                                 // hi  
function b () {
   console.log( 'bye' );
}
b();                                 // bye : override the previous function a


// var favoriteFood = undefined;       // hoisting in global excution context
// var foodThought = undefined;        // hoisting

var favoriteFood = 'graph';
var foodThought = function ()        // function expression
{
   // var favoriteFood = undefined;      // hoisted in foodThought function excution context

   console.log( 'The original favorite Food is ' + favoriteFood );   // undefined
   var favoriteFood = 'orange';
   console.log( favoriteFood );         // orange
}
foodThought();