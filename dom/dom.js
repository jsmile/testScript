/**
 * DOM
 * 
 * - Properties
 * parentElementNode,                 // text와 comment nodes를 무시하고 Element 로만 ( IE9 )
 * children,                          // HTMLCollection( Element 들만 ), direct children 만 반환 : namedItem( '' ), item( index ) ( IE5 )
 * firstElementChild, lastElementChild,    
 * previousElementSibling, nextElementSibling       
 * 
 * parentNode,                          // text, 공백, comment nodes를 포함 ( IE5 )
 * childNodes,                          // NodeList( 모든 하위 node 반환 ) : entries(), keys(), values(),  forEach() ( IE9 )
 * firstChild,  lastChild,              // ( IE6 )
 * previousSibling, nextSibling 
 * 
 * - Properties & Methods
 * textContent,     // 해당 element 가 포함하고 있는 text 만( 공백, 줄바꿈 등의 양식 반영, 눈에 보이지 않는 문자도 모두 포함  )
 * innerText,       // 해당 element 가 포함하고 있는 text 만( 공백, 줄바꿈 등의 양식은 제외, 단 눈에 보이는 문자만 포함 )  
 * innerHtml,       // string 형식으로 표현된 element 및 text 
 * 
 * - Methods
 * createElement()                                             // node 생성 ( IE5 )
 * cloneNode()                                                 // node 복제 ( IE6 )
 * el.parentElementNode.removeChild( el )                      // element 삭제 ( IE5 )
 * el.parentNode.removeChild( target )                         // node 삭제 ( IE5 )
 * insertBefore( newElement, el.firstChild )                   // prependChild() 효과 ( IE6 )
 * appendChild()     // 자식 node 1개만 추가 가능 ( IE5 )
 * removeChild()     // 자식 node 모두 삭제
 * 
 * prepend()       // first child 추가 또는 이동 ( IE 불가 )
 * append()        // last child 추가 또는 이동( 복수개 가능 ) 
 * before()        // 앞에 추가 
 * after()         // 뒤에 추가 
 * remove()         
 * 
 * (주의) element 는 기본적으로 한번에 한 곳에만 위치하고 
 *         동시에 복수개의 위치에 존재하지 못함.
 * ( 기타 ) 
 * element.closest( '.header' ).style.background = 'lightgreen';   // .closest() : element 의 조건에 맞는 가장 가까운 parentElement
 * element.closest( 'element' ).style.background = 'lightgreen';   // element 자신
 * 
 * // element 선택
 * document.querySelector( 'div' );      // 첫번째 element 만 선택
 * document.querySelectorAll( 'div' );   // 모든 element 선택, 
 * 
 * querySelectorAll()         // 반환값이 정적 NodeList( 변경 시에도 즉시 업데이트 안됨 ) .length, .forEach(), item(), Array.from()
 * childNodes                 // 반환값이 동적 NodeList( 변경 시에 즉시 업데이트 됨 )
 * children                   // 반환값이 HTMLCollection( 변경 시 실시간 업데이트 )
 *                                         
 * getElementsByTagName()     // 반환값이 HTMLCollection( 변경 시 실시간 업데이트 ) .length, .item()
 * getElementsByClassName()
 * 
 * // Attribute 
 * element.attrbuteName                            :  표준 attribute 에서만 사용가능
 * element.getAttribute( 'attributeName' );        :  모든 attribute 에 대해 사용가능.
 * element.setAttribute( 'attributeName', value ); :  모든 attribute 에 대해 사용가능.
 * element.removeAttribute( 'attributeName' );     :  모든 attribute 에 대해 사용가능.
 * 
 * img.src    :  O                      //  표준 attribure, 절대경로 반환
 * img.type  :  X                       //  표준 Attribute 가 아님 error 
 * img.getAttribute( 'src' );           //  attribute 에 입력된 값( 상대경로 가능 )
 * img.getAttribute( 'type' );  :  O    //  표준 및 사용자정의 Attribute 구하기
 * noticePopup.setAttribute( 'aria-hidden', true );
 * noticePopup.removeAttribute( 'style' );
 * 
 * 
 * // data Attribute
 * data- 로 시작되는 attribute 는 script 에서 접근 시 camel case 로 접근
 * 
 * < a href="#"  data-version-number="2.0" >
 * var a = document.querySelector( 'a' );
 * a.dataset.versionNumber                     //  2.0 
 * a.getAttribute( 'data-version-number' );    //  2.0, IE
 * 
 * 
 * // JQuery attr() vs prop() , val() : HTML attributes and DOM properties
 * 
 *- value 에 대한 작업은 attr() 이나 prop() 를 사용하지 말고 val() 사용을 권고함.
 *- JQuery 1.6.1 버전부터 attr() 보다는 prop() 의 사용을 권고함.
 *   
 *- property 는 대소문자를 구분, attribute 는 대소문자 구분X.
 *- attr() 은 모든 속성값들을 string 형으로 반환하지만( HTML attribute 를 반환함. )
 *  prop() 는 결과값을 string 또는 object 형으로 반환한다.( DOM property 를 반환함. )
 * 
 *- checked, selected, disabled, and readOnly 등 처럼 boolean attributes 은 브라우저가 초기값 저장에만 사용하고 
 *   사용자의 동작에 실시간 반영되지 않으나 property 는 실시간으로 반영됨.
 *   <input type=”checkbox” checked=”checked”> 
 *    :  사용자의 클릭 동작에 attr()은 실시간으로 반영되지 않으나 prop() 는 실시간으로 반영됨.
 *   if ( elem.checked )
 *   if ( $( elem ).prop( "checked" ) )
 *   if ( $( elem ).is( ":checked" ) )
 * 
 *- 따라서 JQuery 로 설정할 때
 *  $(":checkbox").get(0).checked = true;
 *   // Is the same as $( ":checkbox:first" ).prop( "checked", true );
 *  $( "input[type='checkbox']" ).prop( "checked", function( i, val ) {
 *    return !val;
*   });
 * 
 *      document.querySelector( 'input[type="radio"]:checked' )
 *      document.querySelector( 'input[type="checkbox"]:checked' )
 *      document.querySelector( 'select> option:checked' )
 *   이런 방식으로 사용할 것을 권고함.
 *	- (참고) DOM 도 javascript object 이고, 당연히 property 들을 갖는다.  
 *         몇몇 property 들은 초기값을 markup 에서 같은 이름을 갖고 있는   *attribute 로부터 가져온다.    하지만 attribute 들은 별도의 *
 *         attribute 용 map 에 저장되어 있기 때문에 property 의 변화가 반영되지 않는다.  이런  *예가 바로 boolean attribute 이다.  
 *	- 하지만 일부의 경우에는 특히 사용자 정의 attribute 이거나 attribute 를 통해야만 구할 수 있는 경우도 있다. 이럴 때는 attribute 를 사용해야.
 *	  이는 다음을 참조 : https://blog.jquery.com/2011/05/12/jquery-1-6-1-released/
 *-  ex) in a page at http://example.com/foo.html
 *      <a href='foo.html' class='test one' name='fooAnchor' id='fooAnchor'>Hi</a>
 *   +−−−−−−−−−−−−−−−−−−−−−−−−−------------------+
 *   |             HTMLAnchorElement             |
 *   +−−−−−−−−−−−−−−−−−−−−−−−−−------------------+
 *   | DOM Property :                            |
 *   | href:       "http://example.com/foo.html" |
 *   | name:       "fooAnchor"                   |
 *   | id:         "fooAnchor"                   |
 *   | className:  "test one"                    |
 *   | attributes:                               |   
 *   |    href:  "foo.html"                      |              
 *   |    name:  "fooAnchor"                     |
 *   |    id:    "fooAnchor"                     |
 *   |    class: "test one"                      |
 *   +−−−−−−−−−−−−−−−−−−−−−−−−−------------------+
 *   alert( link.href );                              // alerts "http://example.com/foo.html"  : 표준속성 접근방식
 *   alert( link.getAttribute( "href" ) );            // alerts "foo.html"                                : 표준 및 사용자 속성 접근방식
 *- 아래와 같이 코딩하는 경우에는 property 에 할당을 한 것이기 때문에 이벤트를 받지 못함.
 *  document.body.onload = foo;
 *
 * 
 * ## Sudo classes 
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
 * Element 들의 상태에 따른 선택이 가능하게 한다.
 * 
 * :enabled        :   입력 가능한 상태
 * :disabled       :   입력 불가능한 상태
 * :checked        :   선택된 상태
 * :read-only      :   읽기전용 상태
 * :checked        :   선택된 상태
 * :hover          :   마우스가 위에 머무르는 상태
 * :focus          :   focus 상태
 * :active         :   사용자의 선택에 의해 활성화된 상태
 * :first-child    :   첫번째 child Element
 * :nth-child(n)   :   n 번째 child Element
 * :nth-type-of(n) :   n 번째 type Element
 * :not(…)         :   … 이 아닌 Element
 * 
 * cf)  >, +, ~
 *       >                               :    첫번째 하위레밸 ( ul > li는 <ul> 요소 바로 아래에 위치하는 모든 <li> 요소 ) 
 *       +                               :    바로 이전 옆 Element ( h2 + p는 <h2> 바로 뒤에 위치하는 <p> 요소 ) 
 *       ~                               :    뒤따르는 Element ( p ~ span은 <p> 요소를 뒤따르는 모든 <span> 요소 ) 
 *       ^=                              :    값의 시작이
 *       $=                              :    값의 끝이  
 *       *=                              :    값에서   
 * 
 * 
 * ## Asynchronous task with DOM
 * 
*/

var d1 = document.getElementById('one');
d1.insertAdjacentHTML('beforebegin', '<div id="two">beforebegin</div>');     // insertAdjacentHTML( '위치', html string )
d1.insertAdjacentHTML('afterend', '<div id="three">afterend</div>');     // insertAdjacentHTML( '위치', html string )


const a = document.querySelector( '#a' );
console.log( 'a.nextSibling: ', a.nextSibling );                // nextSibling
console.log( 'a.nextElementSibling: ', a.nextElementSibling );         // <div id="b">b</div>

const confirmBtn = document.querySelector( '#confirmBtn' );
// let isDisabled = confirmBtn.classList.value.split( ' ' ).includes( 'disabled' );
isDisabled = confirmBtn.classList.toggle( 'disabled' );     // toggle(): 있으면 제거하고 없으면 추가
console.log( 'isDisabled: ', isDisabled );                  // true
confirmBtn.classList.add( 'dclass', 'on' );                 // class 추가( 복수개 가능 )
confirmBtn.classList.remove( 'cclass' );                    // class 제거

/*
var dirBody = document.querySelector( 'div[data-ax5grid-panel="body"]' ); 
var checkboxesTr = document.querySelectorAll('div[data-ax5grid-panel=aside-body] table tbody tr');
var tr = document.querySelector( 'div[data-ax5grid-panel="body"] table tbody tr.tr-' + index );
var span = tr.children[0].children[0];
span.innerText = _fileName;

var a_ele = document.querySelectorAll( 'div.popup-notice a' );
console.log( a_ele.length );                                //  2
console.log( a_ele[ 1 ].getAttribute( 'href' ) );           // javascript:fileLocation( '/File/filedata.zip' )
console.log( a_ele[ 1 ].textContent );                      //   a 의 Text 값

const elem1 = document.getElementByTagName( 'li' )[ 0 ];            // 첫번째 element( HTMLCollection 을 일반 element 로 변환 )
const elem2 = document.getElementByClassName( '.li' ).item( 0 );
*/


// select option 들을 24시간으로 채우기
for( let i=0; i<=24; i++ ) 
{
   let option = $( '<option />', 
   {
      text: ( i<10 ) ? '0' + i + '시' : '' + i + '시',
      value: ( i<10 ) ? '0' + i : '' + i
   });
   $( '#fromTime, #toTime' ).append( option );
}
$( '#fromTime' ).val( '00' ); 
$( '#toTime' ).val( '24' );


function appendSelectOptions( _selectBoxId, _options ) 
{
  var selectBox = document.getElementById( _selectBoxId );

  var rankTypeSelOptions = ''; 
  for( let item of _options ) 
  {
    rankTypeSelOptions += '<option value="' + item.value + '">' + item.text + '</option>';
  }
 
  selectBox.innerHTML = rankTypeSelOptions;  
}
const _options = [];
for( let i=0; i<10; i++) {
   // value 와 text 를 가진 option 객체 생성
   _options.push( { value: i, text: '과일 ' + i } );
}
appendSelectOptions( 'fruitSelect', _options );


$(':checkbox').get(2).checked = true;     // 3번째 checkbox 체크( ':' input 의 type )
const checkboxes = document.querySelectorAll( 'input[type="checkbox"]:checked' );
console.log( 'checkboxes[ 1 ].value: ', checkboxes[ 1 ].value );         // java


/*

// selectbox
document.querySelector( '#selConf' ).value;                          // select 도 .value 로 접근 가능

const selectEl = document.querySelector( '#job' );
let selIndex = selectEl.selectedIndex;
selectEl[ selIndex ].value;

const selectEl = document.querySelector( '#job' );
let selIndex = selectEl.selectedIndex;
let selOptions = selectEl.selectedOptions;
selOptions[ selIndex ].label;                              // select 에서 현재 선택된 option 의 text 값

e.target.value                                                                      // select 에서 현재 선택된 option 의 text 값 
e.target.options[e.target.selectedIndex].innerText 

$( '#selConf option:selected' ).text();                               // select 에서 현재 선택된 option 의 text 값 
$( '#selConf option:selected' ).val();                      // selectBox 에서 현재 선택된 option 의 value 값
$( '#selConf' ).val();             
$( '#selConf option[ value != 40 ]' ).remove();                    // 40 이 아닌 것은 제거하라. 전송되는 readonly 만들기 
$( '#selConf option:eq( 0 )' ).prop( 'selected', true );            // select 의 option 선택 : 0, 1, 2, .... 
$( '#selConf select[ name=pGrpId ]:eq( 0 )' ).prop( 'selected', true );
$( '#selConf' ).val( simpleInfo.faqTarget ).prop( 'selected', true );
$( '#selConf option' ).index( $( '#selConf option:selected' ) );   // 현재 선택된 항목의 index 값  
 

// radio button
var checkbox = document.querySelector( 'input[ type=checkbox ]:checked' );   
var chk = checkbox.checked;                         // true             
chk.checked = false;                                // check 해제
document.querySelector( 'input[ name="radioName" ]:checked' ).value;
document.querySelector( 'input[ name="radioName" ]:checked' ).getAttribute( 'id' );
let radioes = document.getElementsByName( 'userPageRadioButton' );
let size = radioes.length;
for( var i=0; i<size; i++ ) 
{
   if( radioes[i].checked ) console.log( radioes[i].value ); 
}
var radioes = document.getElementByName( 'oConf' );
radioes[ i ].nextSibling.firstChild.nodeValue;      // radio 버튼들 중에서 i 번째 것의 옆 span text 값
$( 'input[ name=oConf ]:checked' ).siblings( 'span' ).text();      // 선택된 option 옆 span 의 text 값.
$( 'input[ name=radioOpenY]:checked' ).val();                  // radio 에서 현재 선택된 option 의 value 값
$( '#radioOpenY' ).prop( 'checked', true );           // 특정 radio 를 선택하도록 설정하기

<input type="checkbox" id="toggle1" checked="checked" title="사람만 보기">
<label for="toggle1" onclick= "togleCheckbox(); return false;" >   // togleCheckbox() 이후 추가 실행 방지



// span 
<div class="test">정병귀<span>님 안녕하세요?</span></div>
let test = document.querySelector( 'test' );
console.log( 'test의 Context', test.textContent );  //  정병귀님 안녕하세요?
let subText1 = test.children[ 0 ];
console.log( 'subText1',  subText1 );               //  <span>님 안녕하세요?</span>
let subText2 = subText.children[ 0 ].firstChild.textContent;
console.log( 'subText2', subText2 );                //  님 안녕하세요?

var dataiItem = data.detaiVehicleList[ 1 ];
var itemSp = dataiItem.repairItem + '<br>' + datailItem.devisionDiv;
$( '#item' + index + '> span' ).text( itemSp );
var devisionIndex = $( '#item' + index + '> span' ).text().indexOf(  '<br>'  ); 
var devisionDiv = $( '#item' + index + '> span' ).text().substring( devisionIndex + 4 ).trim();
 
var chkAns = ans.susbstring( startIndex, endIndex ).replace(  /&nbsp;/gim, '' ).trim();



## Form 처리

$( '#userMenuSettingForm #iUser' ).val( $( '#saveForm #iUser' ).val() ); 
$( '#saveForm input[ name=sFile ]' ).val( stationInfo.siFile ); // saveForm 하위의 input 의 value 에 값 설정
textInput.value;                                                                    // Text 타입 Input 의 text 값
 
$( '#saveForm input[ name=sFile ]' ).val( stationInfo.siFile ); // saveForm 하위의 input 의 value 에 값 설정 
 
var formData = document.querySelector( 'form#ksbizForm' );
console.log( formData.length );    // 1
console.log( 'form 의 action : *',  formData.action );
console.log( 'form 의 id : *', formData.id );
console.log( 'form 의 name : *', formData.name );
console.log( 'form 하위의 html : *', formData.innerHTML ); 
console.log( 'form 하위 input 의 id :*', formData.children[ 0 ].id  );
console.log( 'form 하위 input 의 name :*', formData.children[ 0 ].name );
console.log( 'form 하위 input 의 value :*', formData.children[ 0 ].value );
console.log( 'form 하위 input 의 tagName :*', formData.children[ 0 ].tagName );
console.log( 'form 하위 input 의 type :*', formData.children[ 0 ].type );
console.log( 'form 하위 input 의 text :*', formData.children[ 0 ].nextSibling.textContent );
​
var inputData = document.querySelectorAll( 'form#ksbizForm input' );
console.log( inputData.length );   // 2
console.log( 'input 의 id : *', inputData[ 0 ].id );
console.log( 'input 의 name : *', inputData[ 0 ].name );
console.log( 'input 의 value : *', inputData[ 0 ].value );
console.log( 'input 의 tagName : *', inputData[ 0 ].tagName );
console.log( 'input 의 type : *', inputData[ 0 ].type )
console.log( 'input 의 text : *', inputData[ 0 ].nextSibling.textContent );
console.log( inputData[ 0 ].attributes.id.nodeValue );
console.log( inputData[ 0 ].attributes.name.nodeValue );
console.log( inputData[ 0 ].attributes.value.nodeValue );
console.log( inputData[ 0 ].attributes.type.nodeValue );

function createFileDownloadForm( _url, _currentOrTotal )
{
   // console.log( "pageNum : *" + $v_pageNum );
   let userStatus = $v_userStatus;
   let deptId = $v_deptId
   let displayQuantity = $displayQuantity;
   let searchColumn = $( '#searchColumn option:selected' ).val();
   let searchValue = document.getElementById( 'searchValue' ).value;  // text type input
   let pageNum = $v_pageNum;
   let btnRadio = $( 'input[name=userPageRadioButton]:checked' ).val();
   let currentOrTotal = _currentOrTotal;
   
   // let radioes = document.getElementsByName('userPageRadioButton');
   // let size = radioes.length;
   // for( var i=0; i<size; i++ )
   // {
   //    if( radioes[i].checked ) btnRadio = radioes[i].value;   
   // }
   
   let fileForm = document.createElement( 'Form' );
   // form 기본 설정
   fileForm.id = 'fileDownloadForm';
   fileForm.name = 'fileDownloadForm';
   fileForm.action = _url;
   fileForm.method = 'post';
   // fileForm.enctype = 'multipart/form-data';
   // fileForm.target = '_blank';
   // input 생성
   let input1 = createHiddenInput( 'userStatus', userStatus );
   let input2 = createHiddenInput( 'deptId', deptId );
   let input3 = createHiddenInput( 'displayQuantity', displayQuantity );
   let input4 = createHiddenInput( 'searchColumn', searchColumn );
   let input5 = createHiddenInput( 'searchValue', searchValue );
   let input6 = createHiddenInput( 'pageNum', pageNum );
   let input7 = createHiddenInput( 'btnRadio', btnRadio );
   let input8 = createHiddenInput( 'currentOrTotal', currentOrTotal );

   // form 에 input 추가
   fileForm.appendChild( input1 );
   fileForm.appendChild( input2 );
   fileForm.appendChild( input3 );
   fileForm.appendChild( input4 );
   fileForm.appendChild( input5 );
   fileForm.appendChild( input6 );
   fileForm.appendChild( input7 );
   fileForm.appendChild( input8 );

   // document 에 form 추가
   document.body.appendChild( fileForm );
   // console.log("#### fileForm : " + $(fileForm).serialize());

   // submit
   fileForm.submit();
}

*/

/*



## CSS

- .style : inline style 로 적용됨.  속성읽기는 inline style 만 읽을 수 있음. 
                       수정 시 즉시 반영.  class 의 css 보다 우선 적용됨.
               camel case 방식으로 기술 ( background-color -> backgroundColor )

var notice = document.querySelector(".example");
notice.style.cssText = 'bottom: 27%; left:35%;';      // cssText 로 여러개의 속성을 한번에 적용 가능
notice.style.color = 'blue';

- jQuery css()
$( '#apiQuestionTable[ name=grpId ]' ).parent().parent().prev().css( { display: 'none' } );
$( '#apiQuestionTable[ name=grpId ]' ).parent().parent().attr( 'colspan', '3' );
$( '#btnNew' ).prop( 'disabled', true );

- getComputedStyle( element)
getComputedStyle( element ) : inline, css, class 등 실제 적용된 style 속성 객체을 반환함.
const li = document.querySelector( 'li' );
const style = getComputedStyle( li );           // 해당 element 의 모든 style object 를 반환한다.
console.log( 'style.color : ', style.color );

- CSS Variable
css 내의 :root 에 정의된 css variables 에 접근
document.documentElement.style.setProperty( '--primary-color', 'orangered' );

*/


/**
 * DOM Event
 * 
 * keypress             :  문자나 Enter key 에만 반응
 * keydown, keyup       :  모든 key 에 반응
 * .key 또는 .keyCode   :  이벤트를 발생시킨 문자 혹은 코드
 * input                :  value 속성이 바꿜 때마다 즉시 발생. not IE
 * change               :  해당 element 가 focus 를 잃거나 Enter key 를 입력한 뒤 발생
 * mouseover <-> mouseout        :  bubbling O, 자식요소에서도 event 발생,  not IE
 * mouseenter <-> mouseleave     :  bubbling X, 해당 요소에서만 event 발생
 * 
 * event.target         : 내가 클릭한 자식 요소를 반환한다. 
 * event.currentTarget  : 이벤트가 부착된 해당의 요소를 반환한다.
 * 
 * e.target.value                                       // input 의 value
 * inputEl.value                                        // input 의 value 읽고 쓰기 가능
 * e.target.options[e.target.selectedIndex].innerText   // selector 의 Text
 * 
 * document.getElementById( 'btnSave' ).setAttribute( 'onclick', 'modifyView();' );   
 * document.getElementById( 'listSelector' ).addEventListener( 'change', function( e ) 
 * {
 *    console.log( e.target.value );
 * } );
 * document.getElementById( 'listSelector' ).onchange = function( e ) 
 * {
 *    console.log( e.target.value ); 
 * } 
 * 
 * element.addEventListener( ( 'DOMNodeInserted', function( e ) { // 추가되기 전에 발생 ... } );
 * element.addEventListener( ( 'DOMNodeRemoved', function( e ) {  // 제거거되기 전에 발생 ... } );
 * 
 * // JQuery Event
 * $( selector ).on( event, childSelector, data, function, map )
 * 
 * $( document ).on( 'change', '#searchForm select[name=selService]', function() { ... } );
 * $( document ).on( 'change', '#searchForm select[name=oConf]', function() { ... } ); 
 * $( document ).on( 'click', '#searchForm input[name=oConf]', function() { ... } );
 * $( '#msg' ).on( 'click', {msg: "on 함수를 통해서 함수에 전달한 메세지"}, getMessage ); 
 * function getMessage( event ) { alert( event.data.msg ); }
 * 
*/


// pass argument to a eventHandler
const nav = document.querySelector( ".nav" );
// 1) 
nav.addEventListener( 'mouseover', function( e )   // use event delegation 
{
   if( e.target.classList.contains( 'nav__link' ) ) {

      const link = e.target;
      const siblings = link.closest( '.nav' ).querySelectorAll( '.nav__link' );
   
      siblings.forEach( ( el ) => {
         
         if( el !== link ) el.style.opacity = 0.5;         
      } );
   }
} ); // end of nav.addEventListener( 'mouseover', function( e ) 

// 2) 
const handleOver = function( e, opacity ) 
{
   if( e.target.classList.contains( 'nav__link' ) ) {

      const link = e.target;
      const siblings = link.closest( '.nav' ).querySelectorAll( '.nav__link' );
      
      siblings.forEach( ( el ) => {
      
         if( el !== link ) el.style.opacity = opacity;         
      } );
   }

} 

nav.addEventListener( 'mouseover', function( e )     
{
   handleOver( e, 0.5 );
} ); 

// 3) 
const handleHover = function( e ) 
{
   if( e.target.classList.contains( 'nav__link' ) ) {

      const link = e.target;
      const siblings = link.closest( '.nav' ).querySelectorAll( '.nav__link' );
      
      siblings.forEach( ( el ) => {
      
         if( el !== link ) el.style.opacity = this;            // this = bind의 param
      } );
   }

} 

nav.addEventListener( 'mouseover', handleOver.bind( 0.5 ) );      // 복수 param 은 배열/객체로
nav.addEventListener( 'mouseout', handleHover.bind( 1 ) );        // this = bind의 param 


// DOM Lifecycle Events
// .addEventListener( 'DOMContentLoaded', function( e ) {  } );   // html tags 와 javascript 가 준비된 뒤 발생 ( = $.ready() )
// .addEventListener( 'load', function( e ) {   } );                        // html tag, script, css, resources 까지 준비된 뒤 발생
// .addEventListener( 'beforeunload',  function( e ) {   } );
// .addEventListener( 'unload', functio( e ) {   }  );

/*
// DOM 의 child node 추가/삭제 Event
var selectedItemUl = document.querySelector( '#ulOrgSelect' );
// DOM child node 추가 시
selectedItemUl.addEventListener( 'DOMNodeInserted', function( event )
{  // 추가되기 전에 이벤트 발생
	selectedItemsLies = document.querySelectorAll( '.sel_comp' );
	document.querySelector( '#checkItemsSpan' ).innerText = '선택된 기관 수 : ' + selectedItemsLies.length + '개';
});


// DOM child node 삭제 시
selectedItemUl.addEventListener( 'DOMNodeRemoved', function( event )
{  // 제거되기 전에 이벤트 발생
	selectedItemsLies = document.querySelectorAll( '.sel_comp' );
	var itemsCount = selectedItemsLies.length -1;   // 제거 전 event 발생으로 인한 count 보정
	document.querySelector( '#checkItemsSpan' ).innerText = '선택된 기관 수 :  ' + itemsCount + ' 개';
});
*/



/*
   Asynchronous task with DOM
   DOM 은 Call Stack 이 아닌 WEB API Environment 에서 실행되므로 연결된 asynchrous 작업이 필요할 경우에는 addEventListener( 'load', callback ) 가 필요하다.
   DOM :  WEB API Environment -> Micro Task Queue : for Promise -> Call Stack
                                          -> CallBack Queue -> Call Stack 
            Micro Task Queue 가 Callback Queue 보다 우선적인 작업권이 부여됨
                                          
      addEventListener(), Fetch(), setTimer()  : asynchronous task
   그 외 DOM 작업                            : immediate excution task
*/  

el = document.querySelector( 'img' );
el.src = 'dog.jpg';      // asynchronous task of DOM
el.addEventListener( 'load', el => el.classList.add( 'fadeIn' ) );
fatch( 'http://someUrl.com/api' )
   .then( res => console.log( res ) );
