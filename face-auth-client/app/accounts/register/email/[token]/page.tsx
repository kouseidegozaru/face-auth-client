import { verifyRegistrationEmail } from '../../../../_requests/accounts'
import React, { useState, useEffect } from 'react'

const Page = ({ params }) => {
    const [isSuccessLogin, setIsSuccessLogin] = useState(false);
    try {
        useEffect(() => {
            // メール認証リクエスト
            verifyRegistrationEmail(params.token).then((res) => {
                if (res.status === 200) {
                    setIsSuccessLogin(true);
                } else {
                    setIsSuccessLogin(false);
                }
            });
        }, [params.token]);
    } finally {
        setIsSuccessLogin(false);
    }

    return (
        <>
        </>
    );
};
export default Page;