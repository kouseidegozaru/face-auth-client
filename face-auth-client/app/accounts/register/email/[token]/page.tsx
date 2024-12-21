"use client"

import { verifyRegistrationEmail } from '../../../../_requests/accounts'
import React, { useState, useEffect } from 'react'

const Page = ({ params }: { params: Promise<{ token: string }> }) => {
    const [isSuccessLogin, setIsSuccessLogin] = useState(false);
    const { token } = React.use(params);
    useEffect(() => {
        const verifyEmail = async () => {
    try {
            const res = await verifyRegistrationEmail(token);
                if (res.status === 200) {
                    setIsSuccessLogin(true);
                } else {
                    setIsSuccessLogin(false);
                }
          } catch (error) {
        setIsSuccessLogin(false);
    }
        };
    
        verifyEmail();
      }, [token]);

    return (
        <>
            <Header />
            <ContentContainer>
                {isSuccessLogin ? (
                    <div>
                        <h1>登録が完了しました</h1>
                    </div>
                ) : (
                    <div>
                        <h1>登録に失敗しました</h1>
                    </div>
                )}
            </ContentContainer>
        </>
    );
};

const Header = () => {
    return (
        <div className="bg-foreground h-[50px] w-full border-b border-line flex items-center">
            <h4 className="ml-[30px] font-bold">メール送信</h4>
        </div>
    );
}

const ContentContainer = ({ children }) => {
    return (
        <div className="w-full h-[450px] bg-foreground flex flex-col items-center justify-center font-bold">
            {children}
        </div>
    );
}

export default Page;