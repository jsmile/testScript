// PayPal 결제 처리 모듈
console.log('PayPal 결제 모듈이 로드되었습니다.');

function processPayPalPayment(amount) {
    return {
        provider: 'PayPal',
        amount: amount,
        timestamp: new Date(),
        transactionId: 'paypal_' + Date.now()
    };
}

module.exports = {
    processPayment: processPayPalPayment
};
