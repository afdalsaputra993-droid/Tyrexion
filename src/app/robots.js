export default function robots() {
  const baseUrl = 'https://tyrexion.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/admin', '/login', '/auth'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}