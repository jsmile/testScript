// 동적 모듈 로딩 예제 - 결제 서비스

// *** 조건에 따라 동적으로 로드하는 함수
function loadPaymentProcessor(amount) {
    try {
        // 조건에 따라 다른 결제 처리기를 동적으로 로드
        if (amount >= 1000) {
            // 고액 결제는 Stripe 사용
            console.log('고액 결제로 Stripe를 사용합니다.');
            return require('./stripe-payment');
        } else {
            // 소액 결제는 PayPal 사용
            console.log('소액 결제로 PayPal을 사용합니다.');
            return require('./paypal-payment');
        }
    } catch (error) {
        console.error('결제 모듈 로드 실패:', error);
        // 기본 결제 처리기 반환
        return require('./paypal-payment');
    }
}

// *** 환경 설정에 따른 동적 모듈 로딩 예제
function getPaymentProcessor() {
    const env = process.env.PAYMENT_PROCESSOR || 'paypal';
    
    try {
        // 환경 변수에 따라 다른 모듈 로드
        return require(`./${env}-payment`);
    } catch (error) {
        console.error(`${env} 결제 모듈 로드 실패:`, error);
        // 기본값으로 PayPal 사용
        return require('./paypal-payment');
    }
}

// 조건부 모듈 로딩 예제
function processPayment(amount) {
    // 금액에 따라 다른 결제 처리기 사용
    const processor = loadPaymentProcessor(amount);
    return processor.processPayment(amount);
}

// 환경 설정에 따른 결제 처리 예제
function processPaymentByConfig(amount) {
    const processor = getPaymentProcessor();
    return processor.processPayment(amount);
}

// 사용 예제
function runExample() {
    // 1. 금액에 따른 동적 로딩
    console.log('\n1. 금액에 따른 동적 로딩 테스트:');
    console.log('소액 결제 처리:', processPayment(500));
    console.log('고액 결제 처리:', processPayment(1500));

    // 2. 환경 설정에 따른 동적 로딩
    console.log('\n2. 환경 설정에 따른 동적 로딩 테스트:');
    // 환경 변수 설정 예시
    process.env.PAYMENT_PROCESSOR = 'stripe';
    console.log('Stripe로 결제 처리:', processPaymentByConfig(1000));
    
    process.env.PAYMENT_PROCESSOR = 'paypal';
    console.log('PayPal로 결제 처리:', processPaymentByConfig(1000));
}

// 모듈 내보내기
module.exports = {
    processPayment,
    processPaymentByConfig,
    runExample
};
