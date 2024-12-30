
// Aggregating modules

// 여러 서브 모듈을 하나의 부모 모듈로 결합하여 여러 단계의 종속성을 가질 수 있습니다. 
// 상위 모듈에서 다음 양식의 export 구문을 사용하할 수 있음.

/*
    modules/
      canvas.js
      shapes.js
      shapes/
        circle.js
        square.js
        triangle.js
*/
/*
export { Square } from "./shapes/square.js";
export { Triangle } from "./shapes/triangle.js";
export { Circle } from "./shapes/circle.js";
*/

export * as module1 from './module1.js';
export * as module2 from './module2.js';  