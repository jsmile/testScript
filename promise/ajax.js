/**
 * Ajax
 * 
 * - HttpRequest
 * - Fetch : Ajax( 비동기 ) Promise 객체를 반환한다,   ES6
 * - Async, Await : 비동기화된 Promise 객체를 반환한다, ES7( 2017 )
 * - Promise in Parallel : await Promise.all( array )
 * - Asyc Fetch Promise( ES6 ) : 비동기 fetch 를 통한 ajax
 * - Asynchronous task with DOM
 * Top Level await : aysnc 없는 await ( ES2022 )
 * 
*/


/*
   HttpRequest

   Promise 를 지원하지 않아서 callback 함수를 사용해야 함.
      new XMLHttpRequest() : XMLHttpRequest 객체를 생성
      open( method, url, async ) : 요청을 준비함
      addEventListener( 'load', function(){} ) : 요청이 완료되면 실행할 함수 지정
      addEventListener( 'error', function( e ){} ) : 요청이 실패하면 실행할 함수 지정
      send() : 요청을 전송함
*/

const firstReq = new XMLHttpRequest();
firstReq.open( 'GET', 'https://swapi.py4e.com/api/' );
firstReq.send();
firstReq.addEventListener( 'load', function() {
   console.log( 'FIRST REQUEST 완료!!!' );

   const data = JSON.parse( this.responseText );
   const filmURL = data.films;
   console.log( 'filmURL : ', filmURL );
   // const filmURL = data.results[0].films[0];

   const secondReq = new XMLHttpRequest();
   secondReq.open( 'GET', filmURL );
   secondReq.send();
   secondReq.addEventListener( 'load', function (e) {
      console.log( 'SECOND REQUEST 완료!!!' );

      const filmData = JSON.parse( this.responseText );
      console.log( 'filmData.title : ', filmData.results[ 0 ].title );
   } );
   secondReq.addEventListener( 'error', function( e ) {
      console.log( 'Second Request Error !!' );
   } );

});
firstReq.addEventListener( 'error', function( e ) {
   console.log( 'First Request Error !!' );
} );



/*
   Fetch : Ajax( 비동기 ) Promise 객체를 반환한다,   ES6

   Promise 객체를 반환하므로 결과값에서 then() 을 호출할 수 있다.
   원칙적으로 resolve 반환( Http 200 이외의 응답도 포함 )
   작업결과가 없으면 ok 에 false 반환하고,
   Network 문제 시에만 reject 반환
   resolve() 의 parameter 로 response 객체를 전달한다.  즉  resolve( response ) 임.
   response.body : 반환되는 data 값들이 저장됨.
   response.json() : JSON.parse( Response.body ) 를 포함한 Promise() 로 반환함 
   Response 는 ReadableStream --> byte data
*/

const getCountryData = function( countryName ) {

   // fetch( 'https://restcountries.eu/rest/v2/name/' + countryName)
   fetch( `https://restcountries.com/v3.1/name/${countryName}` )
      .then( ( response ) => {

         if( !response.ok) {
            throw new Error('해당 국가를 찾을 수 없습니다. (' + response.status + ')');
         }
         
         // response.body : 반환되는 data 값들이 저장됨.
         console.log( 'fetch response.body: ', response.body );
         
         // response.json() : JSON.parse( Response.body ) 를 포함한 Promise() 로 반환함
         response.json()
            .then(
               ( data ) => {
                  console.log( 'fetch response.json() data : ', data );
                  console.log( 'fetch response.json() data[ 0 ] : ', data[ 0 ] );
                  console.log( 'fetch response.json() data[ 0 ].capital : ', data[ 0 ].capital );
               }
            );
      })
      .catch( ( error ) => {

         console.log( 'fetch error : ', error );
      });

      // or  response.json() 의 Promise 객체를 반환하여 처리리
      fetch( `https://restcountries.com/v3.1/name/${countryName}` )
         .then(
            ( response ) => {

               if( !response.ok ) {
                  throw new Error( `해당 국가를 찾을 수 없습니다. ( ${ response.status } )` );
               }

               return response.json();    // response.json() 의 Promise 객체를 반환함
            }
         )
         .then(
            ( data ) => {
               console.log( 'fetch return response.json() data : ', data );
               console.log( 'fetch return response.json() data[ 0 ] : ', data[ 0 ] );
               console.log( 'fetch return response.json() data[ 0 ].capital : ', data[ 0 ].capital );
            }
         )
         .catch( 
            ( err ) => {
               console.log( 'fetch return error : ', err );
            }
         )
         .finally( () => {                      // 성공여부와 상관없이 항상 실행됨
            console.log( 'fetch 작업 완료' );
         });
}
// getCountryData( 'portugal' );
getCountryData( 'south%20korea' );     // %20 : 공백문자


// POST 메서드 구현 예제
async function postData( url = "", data = {} ) {
   // 옵션 기본 값은 *로 강조
   const options = {
      method: "POST", // *GET, POST, PUT, DELETE 등
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify( data ), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
   }

   const response = await fetch( url, options );
   return response.json();          // JSON 응답을 네이티브 JavaScript 객체로 파싱
 }
 
//  postData( "https://example.com/answer", { answer: 42 } )        // { answer: 42 } : POST 메서드로 전달할 data
//    .then( (data) => {
//       console.log( data ); // JSON 데이터가 `data.json()` 호출에 의해 파싱됨
//    });



/*
   Async, Await : 비동기화된 Promise 객체를 반환한다, ES7( 2017 )

   - async function : 암시적으로 Promise를 사용하여 결과를 반환, 내용에 await 가 포함될 수 있음.
   - await Promise 는 Promise.then( (res) = {} ) 와 동일함.
   - 성공( resolve )과 실패( reject )를 가지고 있는 callback 함수를 포함한 Promise 객체를 반환한다.
   - 기본은 성공( resolve )을 반환하는데 함수 내에서 throw 를 해줄 때에만 실패( reject )를 반환한다.
   - Micro Task Queue 이용
   - IE 지원하지 않음.
*/

async function foo() {
   return 1;
 }
// 는 아래와 동일함.
function foo() {
   return Promise.resolve(1);
} 


async function foo() {
   await 1;
 }
// 는 아래와 동일함.
function foo() {
   return Promise.resolve(1).then(() => undefined);
} 


async function add( x, y ) {
   
   if( typeof x !== 'number' || typeof y !== 'number' ) {
      throw 'x, y 는 숫자여야 합니다.';   // 실패( reject )를 반환      // .catch() 에서 처리하기 위해 throw 사용
   }

   return x + y;
}

add( 1, 2 )
   .then( ( result ) => {
      console.log( 'add( 1, 2 ) : ', result );
   } )
   .catch( 
      ( error ) => {
         console.log( 'add( 1, 2 ) error: ', error );
      }
   );

add( 'c', 2 )
   .then( ( result ) => {
      console.log( 'add( c, 2 ) : ', result );
   } )
   .catch( 
      ( error ) => {
         console.log( 'add( c, 2 ) error: ', error );
      }
   );


// async ~ await 사용 예제
var resolveAfter2Seconds = function () {
   console.log("시작...slow promise");
   return new Promise((resolve) => {
     setTimeout(function () {
       resolve(20);
       console.log("완료...slow promise");
     }, 2000);
   });
 };
 
 var resolveAfter1Second = function () {
   console.log("시작...fast promise");
   return new Promise((resolve) => {
     setTimeout(function () {
       resolve(10);
       console.log("완료...fast promise");
     }, 1000);
   });
 };

 // 실행과 작업종료 모두 await 순서대로 진행됨.
 var sequentialStart = async function () {
   console.log("### SEQUENTIAL START ###");
 
   const slow = await resolveAfter2Seconds();
   console.log('sequentialStart: ', slow);
 
   const fast = await resolveAfter1Second();
   console.log('sequentialStart: ', fast);
 };

 // 순차적으로 실행되고, 먼저 작업 종료와 상관없이 await 순서로 출력함.
 var concurrentStart = async function () {
   console.log("### CONCURRENT START with await ###");

   // 순차적 실행, 작업 소요 시간에 따른 종료
   const slow = resolveAfter2Seconds();  // starts timer immediately
   const fast = resolveAfter1Second();
   // 그러나 await 순서에 따른 출력
   console.log( 'concurrentStart ', await slow );
   console.log( 'concurrentStart: ', await fast );  // waits for slow to finish, even though fast is already done!
 };
 
 // 순차적으로 실행되고, 모든 작업들이 종료된 후 결과를 반환함.
 var stillConcurrent = function () {
   console.log("### CONCURRENT START with Promise.all ###");

   // 모든 것들이 종료되고 난 다음에 결과들을을 반환
   Promise.all([ resolveAfter2Seconds(), resolveAfter1Second() ])   
      .then(
         (messages) => {
            console.log( 'stillConcurrent: ', messages[0] ); // slow
            console.log( 'stillConcurrent: ', messages[1] ); // fast
         },
      );
 };
 
 // 순차적으로 실행되고, 빨리 작업이 종료되는 것부터 결과를 반환함.
 var parallel = function () {
   console.log("### PARALLEL with Promise.then ###");

   resolveAfter2Seconds().then((message) => console.log( 'parallel: ', message));
   resolveAfter1Second().then((message) => console.log( 'parallel: ', message));
 };
 
 sequentialStart(); // after 2 seconds, logs "slow", then after 1 more second, "fast"
 // wait above to finish
 setTimeout(concurrentStart, 4000); // after 2 seconds, logs "slow" and then "fast"
 // wait again
 setTimeout(stillConcurrent, 7000); // same as concurrentStart
 // wait again
 setTimeout(parallel, 10000); // trully parallel: after 1 second, logs "fast", then after 1 more second, "slow"   