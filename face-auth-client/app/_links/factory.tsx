

import Link from 'next/link';

type GeneratedPath = {
    Link: React.FC<{ children: React.ReactNode; linkKey?: string | null }>;
    Redirect: ({ linkKey }?: { linkKey?: string | null }) => void;
    path: string;
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
    const GeneratedLink: React.FC<{ children: React.ReactNode; linkKey?: string | null }> = ({ children, linkKey }) => {
        const href = linkKey ? `${basePath}/${linkKey}` : basePath;
        return <Link href={href}>{children}</Link>;
    };

    /**
     * リンク遷移を実行する関数
     *
     * @param {string} linkKey - オプションのリンクキー
     */
    const GeneratedRouter = ({ linkKey }: { linkKey?: string | null } = {}): void => {
        const href = linkKey ? `${basePath}/${linkKey}` : basePath;
        window.location.href = href;
    };
    
    return { Link: GeneratedLink, Redirect: GeneratedRouter, path: basePath };
};

export default FactoryPath;
