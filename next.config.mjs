const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
      ]
    },
  },
  rewrites: () => [
    {
      source: '/storage/:path*',
      destination: `${process.env.S3_ENDPOINT}/:path*`
    }
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '1evel.ru',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'images.wallpaperscraft.ru',
        pathname: '**'
      }
    ],
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url

      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [{
          loader: '@svgr/webpack', options: {
            svgoConfig: {
              plugins: [{
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: true,
                    mergePaths: false,
                  },
                },
              }],
            },
          },
        }],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

};

export default nextConfig;
