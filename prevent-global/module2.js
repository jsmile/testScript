/*
   ES6 module pattern 
   - 함수 앞에 export 키워드를 붙이면 외부에서 사용할 수 있는 함수로 선언된다.
*/

import { fight as fight1} from './module1.js';     // as fight1:  현재 module 의 fight 함수와 충돌 방지를 위해 이름 변경
// import module2 from 'module2'; // .importedFunc

var herry = 'potter';
export const voldmort = 'devil';

// private 함수 선언
function jump()                           
{
   console.log( 'jump' );
}

// export 로 외부 공개 함수 선언 : { } 와 함께 사용
export function fight(char1, char2)       
{
   const attack1 = Math.floor(Math.random() * char1.length);
   const attack2 = Math.floor(Math.random() * char2.length);

   return attack1 > attack2 ? `${char1} wins` : `${char2} wins`;
}

// export default 로 { } 없이 사용할 수 있는 외부 공개 함수 선언
export default function sayHello()  
{
   console.log( '*** Hey, hello ~~~' );
}

console.log( fight1( ['Merry', 'Jane'] ) );
console.log( fight( herry, voldmort ) );