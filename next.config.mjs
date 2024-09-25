import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/**
 * @type {import('next').NextConfig}
 */
export default {
  webpack: (config, options) => {
    const { isServer } = options;
    
    config.plugins.push(
      new NextFederationPlugin({
        name: 'mfe1',
        filename: 'static/chunks/remoteEntry.js',

        remotes: {
          mfe2: 'mfe2@http://localhost:3001/_next/static/chunks/remoteEntry.js',
        },

        shared: {
          // shared modules
        },
      })
    );
    return config;
  },
};



/*import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const nextConfig = {
  reactStrictMode: true,
  webpack(config,options ){
    config.plugins.push(
      new NextFederationPlugin({
        name: 'mfe1',
        filename: 'static/chunks/remoteEntry.js',

        remotes: {
          mfe2: 'mfe2@http://localhost:3001/static/chunks/remoteEntry.js',
        },

        shared: {
          react: {
            singleton: true,
            requiredVersion: '^18.0.0',
            eager: true,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: '^18.0.0', 
            eager: true,
          },
        },

        initOptions: {
          shareStrategy: 'loaded-first',
        },

        extraOptions: {
          exposePages: true,
          enableImageLoaderFix: true,
          enableUrlLoaderFix: true,
        },
      })
    )
    return config;
  },
};

export default nextConfig;
*/