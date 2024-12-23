import type { NextConfig } from "next";
const { PHASE_DEVELOPMENT_SERVER} = require( "next/constants" )

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = ( phase, { defaultConfig }) => {
  if( phase === PHASE_DEVELOPMENT_SERVER ){ //npm run devで起動された時
    return {
      env: {
        API_BASE_URL: 'http://localhost:8000',
        }
    }
  }
}

export default nextConfig;
