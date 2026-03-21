import crypto from 'crypto';

export const generateEsewaSignature = async (secret: string, message: string) => {
    // Escaping can sometimes cause issues.
    // eSewa v2 Hash structure
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(message);
    return hmac.digest('base64');
};


export const initiateEsewaPayment = async (data: any) => {
    const { amount, transaction_uuid, product_code, secret } = data;
    // eSewa v2 expects exactly total_amount={amount},transaction_uuid={transaction_uuid},product_code={product_code}
    const message = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const signature = await generateEsewaSignature(secret, message);
    return signature;
};

