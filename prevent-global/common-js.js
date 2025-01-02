// CommonJS 모듈 사용 예제

// 모듈 불러오기
const userService = require('./user-service');
const paymentService = require('./payment-service');

// 사용자 추가
const user1 = userService.addUser({
    name: 'John Doe',
    email: 'john@example.com'
});

const user2 = userService.addUser({
    name: 'Jane Smith',
    email: 'jane@example.com'
});

// 결제 처리
const payment1 = paymentService.processPayment(user1.id, 100);
const payment2 = paymentService.processPayment(user2.id, 150);
const payment3 = paymentService.processPayment(user1.id, 75);

// 결과 출력
console.log('모든 사용자:', userService.getAllUsers());
console.log('User 1의 결제 내역:', paymentService.getPaymentHistory(user1.id));
console.log('User 2의 결제 내역:', paymentService.getPaymentHistory(user2.id));
