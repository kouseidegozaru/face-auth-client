"use client"

import { verifyRegistrationEmail } from '../../../../_requests/accounts'
import React, { useState, useEffect } from 'react'
import { LoginPage , RegisterPage } from '@/app/_links/accounts';

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
                    <div className="text-center">
                        <p className="text-sm">登録が完了しました</p>
                        <div className='flex text-[14px]'>
                            <LoginPage.Link>
                                <p className="text-primary1 hover:text-primary1_hover">こちら</p>
                            </LoginPage.Link>
                            <p>からログインしてください</p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-sm">登録に失敗しました</p>
                        <div className='flex text-[14px]'>
                            <RegisterPage.Link>
                                <p className="text-primary1 hover:text-primary1_hover">こちら</p>
                            </RegisterPage.Link>
                            <p>から再度登録してください</p>
                        </div>
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