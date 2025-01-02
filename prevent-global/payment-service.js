// CommonJS 모듈 예제 - 결제 서비스

// 다른 모듈 불러오기
const userService = require('./user-service');

// private 변수
const payments = new Map();

// private 함수
function generatePaymentId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 외부로 공개할 함수들
function processPayment(userId, amount) {
    const user = userService.getUser(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const paymentId = generatePaymentId();
    const payment = {
        id: paymentId,
        userId,
        amount,
        timestamp: new Date()
    };

    payments.set(paymentId, payment);
    return payment;
}

function getPaymentHistory(userId) {
    const userPayments = [];
    payments.forEach(payment => {
        if (payment.userId === userId) {
            userPayments.push(payment);
        }
    });
    return userPayments;
}

// CommonJS 방식으로 함수들을 외부로 공개
module.exports = {
    processPayment,
    getPaymentHistory
};
