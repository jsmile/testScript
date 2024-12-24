/**
 * Promise
 * 
 * - 성공( resolve )과 실패(  reject )를 가지고 있는 callback 함수를 포함한 Promise 객체를 반환한다.
 * - Micro Task Queue 이용
 * - Promise 형 return 값  --> then() 내 함수의 param으로 전달된다.
 * - 복수개의 Promise 가 실행되는 경우에는 실행은 순서대로 진행되지만 결과는 순서를 보장하지 않는다.
 * 
 * - 만드는 방법 1 : 변수에 직접 new Promise( ( resolve, reject ) => { … } ) 
 * - 만드는 방법 2 : 함수의 return 값으로 new Promise( ( resolve, reject ) => { … } )

 * 
*/


const myPromise = new Promise( ( resolve, reject ) => 
   {
      const ran = Math.random();
      if( ran < 0.5 )           // resolve() 나 reject() 할 조건을 임의로 만듬.
      { 
         resolve( '성공' );        // 성공 시 실행되는 callback 함수
      }
      else 
      { 
         reject( '실패' );          // 오류 시 실행되는 callback 함수
      }
   } );
   
myPromise
   .then( function (res) {
      console.log( 'res1: ', res);     // 성공
   })
   .catch( function (err) {
      console.log( 'err1: ', err);     // 실패
   });


const promise2 = new Promise( (resolve, reject) => {

   if( true ) { resolve( 'Resolve Worked' ); }
   else { reject( 'Reject Worked' ); }
} );

promise2
   .then( function ( res ) {				                  // res : resolve 의 param :  Resolve Worked
		  console.log( 'promise2_res1 : ', res );
		  return res + '!';
    })
   .then( ( res ) =>					                        // res1 : return 값
   { 
      console.log( 'promise2_res2 : ', res );            // Resolve Worked!
      return res + '?';
   })
   .then( ( res ) =>                                     // res2 : return 값
   { 
      console.log( 'promise2_res3 : ', res );            // Resolve Worked!?
      return res + '#';
   })
   .catch( function( err )                               // promise2 의 error 시 호출 'Reject Worked'
   {
      console.log( 'promise2_err1 : ', err );
   })
   .then( function ( result )                            // error 와 상관없이 바로 앞 then() 의 return 값이 전달됨. 
   {
      console.log( 'result : ', result );		            // 마지막이라 return 이 필요없음 : Resolve Worked ?!#
   })
   .catch( (error) =>                                 // 어느 곳에서나 error 이 발생하면 호출됨
   {
      console.log( error );
   });


   const prom3 = new Promise( function( resolve, reject ) {

      // setTimeout( resolve( 'OK' ), 2*1000 );
      setTimeout( function() {
         let message = 'OK ' + '!';
         resolve( message );
      }, 2*1000 );
   });

   prom3.then( function (result) {
      console.log( 'prom3_result1 : ', result );      
   })
   .catch( function ( err ) {
      console.log( err );
   })
   .finally( function () {
      console.log( 'the End!' );
   })



const fakeRequest = (url) => {

   return new Promise( function( resolve, reject ) {

      setTimeout(() => {
         
         const pages = {
            '/users': [
               { id: 1, username: 'Bilbao', age: 30 },
               { id: 5, username: 'Esmerelda', age: 20 }               
            ],
            '/users/1': { 
               id: 1, 
               username: 'Bilbao', 
               age: 30,
               upvotes: 360,
               city: 'Lisbon',
               topPostId: 454321
            },
            '/users/5': { 
               id: 5, 
               username: 'Esmerelda', 
               age: 20,
               upvotes: 571,
               city: 'Honolulu',
            },
            '/posts/454321': {
               id: 454321,
               title: 'Ladies & Gentlemen, may I introduce my pet pig, Hamlet'
            },
            'about': 'This is the about page!'
         };

         const data = pages[url];
         if( data ) { resolve( { status: 200, data: data} ); }
         else { reject( { status: 404, msg: 'Error !!' } ); }

      }, 1*1000 );
   });
} // end of fakeRequest

fakeRequest('/users')
	.then((result) => {
		console.log(result);
		const id = result.data[0].id;
		return fakeRequest(`/users/${id}`);          // return Promise 을 반복하여 chainning 가능
	})
	.then((result) => {
		console.log(result);
		const postId = result.data.topPostId;
		return fakeRequest(`/posts/${postId}`);  // return Promise
	})
	.then((result) => {
		console.log(result);                      // 마지막이라 return 이 필요없음.
	})
	.catch((err) => {
		console.log('OH NO!', err);
	});



// 동기적으로 실행되는 Promies: 실패가 없는 경우에만 성공 결과 모두 반환, 실패가 있으면 실패만 반환
// 복수개의 Promise 가 실행되는 경우에는 실행은 순서대로 진행되지만 결과의 순서를 보장하지 않음음.
Promise.all( [  
   Promise.resolve( 'Success 1' ),           // 성공 1
   Promise.reject( 'Error' ),                // 실패 1
   Promise.resolve( 'Success 2' )            // 성공 2
] )
   .then( result => console.log( 'all_1 : ', result ) )       // Error 만 반환되므로 resolve 인 then 은 실행되지 않음.   
   .catch( error => console.log( 'all_error : ', error ));


// 성공 실패 상관없이 모든 처리가 끝날 때까지 대기 후 모든 결과 반환
Promise.allSettled( [
   Promise.resolve( 'Success 1' ),
   Promise.reject( 'Error' ),
   Promise.resolve( 'Success 2' )
] )
   .then( result => console.log( 'allSettled : ', result ) );    
// [
//   {status: 'fulfilled', value: 'Success 1'},
//   {status: 'rejected', reason: 'Error'},
//   {status: 'fulfilled', value: 'Success 2'}
// ]  


const urls = [
   'https://jsonplaceholder.typicode.com/users', 
   'https://jsonplaceholder.typicode.com/posts', 
   'https://jsonplaceholder.typicode.com/alblums', 
];


// promise.all() 이 비동기적으로 실행되는 fetch() 를 포함하는 경우에는는  
// 모든 fetch가 완료될 때까지 기다리므로, 
// 성공한 요청의 결과와 실패한 요청의 에러 모두를 볼 수 있습니다( .then() ).
Promise.all([
   fetch( urls[0] ),
   fetch( urls[1] ),
   fetch( urls[2] )
])
.then( result => console.log( 'all_2 : ', result ) )         // fetch() 들의 모든 결과 확인 : (3) [Response, Response, Response] 
.catch( error => console.log( 'all_error2 : ', error ) );    // 모든 fetch() 가 실패 시에만 error 반환

Promise.all( 
      urls.map( url => 
      {
         return fetch( url ).then( result => result.json() );  // fetch() : 비동기 Promise 반환
      }) 
   )
   .then( results => 
      { 
         console.log( 'results[ 0 ]: ', results[ 0 ] ); 
         console.log( 'results[ 1 ]: ', results[ 1 ] ); 
         console.log( 'results[ 2 ]: ', results[ 2 ] ); 
      } 
   )
   .catch( error =>  console.log( 'all_error : ', error ) );  // 모든 fetch() 가 실패 시에만 error 반환



// 성공 실패 구분없이 가장 빠른 처리 결과 반환 : Promise.race( )
const timeout = function( sec ) 
{
   return new Promise( function( res, reject ) 
            {
               reject( new Error( 'Request took too time !' ) );
            }, sec * 1000 );
}
const getJSON = function( url ) 
{
   return fetch( url );
};

Promise.race( [
      getJSON( 'https://restcountries.eu/rest/v2/name/ezipt' ),
      Promise.reject( 'Error' ),
      timeout( 3 )
   ] 
)
.then( result => console.log( 'race result : ', result ) )
.catch( err => console.log( 'race error: ', err ) );
 


// 가장 빨리 성공한 결과를 반환하거나 모두 실패한 경우 실패( AggregateError ) 반환
Promise.any( [
      Promise.reject( 'any Error' ),
      Promise.resolve( 'any Success 1' ),
      Promise.resolve( 'any Success 2' )
   ] 
)
.then( res => console.log( res ) );   // Success 1