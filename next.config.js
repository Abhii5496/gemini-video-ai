/** @type {import('next').NextConfig} */

// module.exports = {
//   reactStrictMode: true,
//   headers() {
//     return [
//       {
//         source: "/",
//         headers: [
//           {
//             key: "Cross-Origin-Embedder-Policy",
//             value: "require-corp",
//           },
//           {
//             key: "Cross-Origin-Opener-Policy",
//             value: "same-origin",
//           },
//         ],
//       },
//     ];
//   },
// };

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};
