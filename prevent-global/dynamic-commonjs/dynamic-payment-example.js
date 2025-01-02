// 동적 모듈 로딩 테스트

const paymentService = require('./dynamic-payment-service');

console.log('===== CommonJS 동적 모듈 로딩 테스트 =====');

// 예제 실행
paymentService.runExample();

// 추가 테스트: 다양한 금액으로 결제 처리 테스트
console.log('\n3. 다양한 금액의 결제 테스트:');
const testAmounts = [100, 800, 1000, 1200, 2000];

testAmounts.forEach(amount => {
    console.log(`\n${amount}원 결제 처리:`);
    const result = paymentService.processPayment(amount);
    console.log('결제 결과:', result);
});
