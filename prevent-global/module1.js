
// ----------------------------------------------------------------------------------------
// 4. ES6 module :  
// - 선언:  <script type="module" src="module1.js"></script>
// - 단일 함수 공걔 :  개별 함수 앞에 export 키워드를 붙이면 외부에서 사용할 수 있는 함수로 선언. 
// - 복수 함수 공개 :  export { 함수명1, 함수명2, ... }
// - default 함수 공개 :  export default 함수명
// - ES6 module 사용 :  import ~ from 으로 외부 module 호출
// - ES6 module 복수개 사용 :  import { 함수명1, 함수명2, ... } from 'module1'
// - ES6 module 충돌 방지를 위한 이름 변경 사용 :  import { 함수명1 as 함수명2, ... } from 'module1'
// 

export function fight(params) {
   // 또 다른 자신 만의 fight 함수 정의 가능
   params.forEach(param => {
      console.log( 'module1 fight: ', param);
   });
}
