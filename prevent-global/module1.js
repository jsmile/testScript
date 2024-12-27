// 3. module 를 사용하여 외부로 함수 공개

function fight(params) {
   // 또 다른 자신 만의 fight 함수 정의 가능
}

module.exports =   // module.exports 로 외부 공개 함수 반환 
{
   fight: fight
};

