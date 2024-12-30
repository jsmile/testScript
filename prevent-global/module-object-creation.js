// module object 생성 사용: module 에 대한 namespace 를 사용하여 접근 가능

import * as module1 from './module1.js';
import * as module2 from './module2.js';     // 모듈접근을 위한 namespace 생성


console.log( 'module1.fight(): ', module1.fight( ['Merry', 'Jane'] ) );   // namespace 사용하여 모듈 접근
console.log( 'module2.fight(): ', module2.fight( 'Merry', 'Jane' ) );