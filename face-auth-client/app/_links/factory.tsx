import Link from 'next/link';

type GeneratedPath = {
    Link : React.FC<{ children: React.ReactNode }>,
    Redirect : () => void
}

/**
 * Linkコンポーネントを生成する高階関数
 *
 * @param {string} path - The path to link to.
 * @returns {React.FC<{ children: React.ReactNode }>} - A function component
 */
const FactoryPath = (path: string): GeneratedPath => {
    
    if (!path) {
        path = '/'
    }

    /**
     * 指定されたリンクに遷移するコンポーネント
     *
     * @param {{ children: React.ReactNode }} props - Props to pass to the component.
     * @returns {JSX.Element} - The component.
     */
    const GeneratedLink = ({ children }: { children: React.ReactNode }): JSX.Element => {
        return <Link href={`${path}`}>{children}</Link>;
    };

    const GeneratedRouter = (): void => {
        window.location.href = path
    }

    return { Link: GeneratedLink, Redirect: GeneratedRouter };
};

export default FactoryPath
