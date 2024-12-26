import Link from 'next/link';
import { useRouter } from 'next/router';

type GeneratedPath = {
    Link: React.FC<{ children: React.ReactNode; linkKey?: string }>;
    Redirect: ({ linkKey }: { linkKey?: string }) => void;
};

/**
 * Linkコンポーネントを生成する高階関数
 *
 * @param {string} path - The path to link to.
 * @returns {GeneratedPath} - LinkとRedirectを含むオブジェクト
 */
const FactoryPath = (path: string): GeneratedPath => {
    const basePath = path || '/';

    /**
     * 指定されたリンクに遷移するコンポーネント
     *
     * @param {{ children: React.ReactNode; linkKey?: string }} props - Props to pass to the component.
     * @returns {JSX.Element} - The component.
     */
    const GeneratedLink: React.FC<{ children: React.ReactNode; linkKey?: string }> = ({ children, linkKey }) => {
        const href = linkKey ? `${basePath}/${linkKey}` : basePath;
        return <Link href={href}>{children}</Link>;
    };

    /**
     * リンク遷移を実行する関数
     *
     * @param {string} linkKey - オプションのリンクキー
     */
    const GeneratedRouter = ({ linkKey }: { linkKey?: string }): void => {
        const router = useRouter();
        const targetPath = linkKey ? `${basePath}/${linkKey}` : basePath;
        router.push(targetPath);
    };

    return { Link: GeneratedLink, Redirect: GeneratedRouter };
};

export default FactoryPath;
