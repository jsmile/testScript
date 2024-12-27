/*
   ES6 module pattern 
   - 함수 앞에 export 키워드를 붙이면 외부에서 사용할 수 있는 함수로 선언된다.
*/

// import modeul1 from 'module1'; // .fight
// import module2 from 'module2'; // .importedFunc

var herry = 'potter';
var voldmort = 'devil';

// private 함수 선언
function jump()                           
{
   console.log( 'jump' );
}

// export 로 외부 공개 함수 선언 : { } 와 함께 사용
export function fight(char1, char2)       
{
   var attack1 = Math.floor(Math.random() * char1.length);
   var attack2 = Math.floor(Math.random() * char2.length);

   return attack1 > attack2 ? `${char1} wins` : `${char2} wins`;
}

// export default 로 { } 없이 사용할 수 있는 외부 공개 함수 선언
export default function sayHello()  
{
   console.log( '*** Hey, hello ~~~' );
}

console.log( module1.fight( 'Merry', 'Jane' ) );
console.log( fight( herry, voldmort ) );