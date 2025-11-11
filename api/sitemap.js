// api/sitemap.js
const admin = require('../firebaseAdmin'); // your Firebase Admin SDK setup

// Helper to generate sitemap XML
const generateSitemapXML = (urls) => {
  const urlElements = urls.map(
    ({ loc, lastmod, changefreq, priority }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  ).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
};

module.exports = async (req, res) => {
  try {
    const db = admin.database();
    const snapshot = await db.ref('ads').once('value');
    const ads = snapshot.val() || {};

    // Dynamic URLs from Firebase ads
    const dynamicUrls = Object.keys(ads).map((key) => {
      const ad = ads[key];
      const lastmod = ad.createdAt
        ? new Date(Number(ad.createdAt)).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      return {
        loc: `https://globalscalesub.com/ad/${key}`,
        lastmod,
        changefreq: 'daily',
        priority: 0.8
      };
    });

    // Static pages array
    const staticPages = [
      { loc: 'https://globalscalesub.com/', lastmod: '2025-11-09', changefreq: 'daily', priority: 1.0 },
      { loc: 'https://globalscalesub.com/categories', lastmod: '2025-11-09', changefreq: 'weekly', priority: 0.9 },
      { loc: 'https://globalscalesub.com/electronics', lastmod: '2025-11-09', changefreq: 'daily', priority: 0.9 },
      { loc: 'https://globalscalesub.com/fashion', lastmod: '2025-11-09', changefreq: 'daily', priority: 0.9 },
      { loc: 'https://globalscalesub.com/vehicles', lastmod: '2025-11-09', changefreq: 'daily', priority: 0.9 },
      { loc: 'https://globalscalesub.com/property', lastmod: '2025-11-09', changefreq: 'daily', priority: 0.9 },
      { loc: 'https://globalscalesub.com/services', lastmod: '2025-11-09', changefreq: 'daily', priority: 0.9 },
      { loc: 'https://globalscalesub.com/login', lastmod: '2025-11-09', changefreq: 'monthly', priority: 0.3 },
      { loc: 'https://globalscalesub.com/signup', lastmod: '2025-11-09', changefreq: 'monthly', priority: 0.3 },
      { loc: 'https://globalscalesub.com/how-it-works', lastmod: '2025-11-09', changefreq: 'monthly', priority: 0.7 },
      { loc: 'https://globalscalesub.com/success-stories', lastmod: '2025-11-09', changefreq: 'weekly', priority: 0.7 },
      { loc: 'https://globalscalesub.com/business-solutions', lastmod: '2025-11-09', changefreq: 'monthly', priority: 0.8 },
      { loc: 'https://globalscalesub.com/enterprise', lastmod: '2025-11-09', changefreq: 'monthly', priority: 0.8 },
      { loc: 'https://globalscalesub.com/help-center', lastmod: '2025-11-09', changefreq: 'weekly', priority: 0.8 },
      { loc: 'https://globalscalesub.com/faq', lastmod: '2025-11-09', changefreq: 'weekly', priority: 0.7 },
      { loc: 'https://globalscalesub.com/safety-tips', lastmod: '2025-11-09', changefreq: 'monthly', priority: 0.6 },
      { loc: 'https://globalscalesub.com/contact', lastmod: '2025-11-09', changefreq: 'monthly', priority: 0.5 },
      { loc: 'https://globalscalesub.com/community', lastmod: '2025-11-09', changefreq: 'weekly', priority: 0.6 },
      { loc: 'https://globalscalesub.com/advertising', lastmod: '2025-11-09', changefreq: 'monthly', priority: 0.5 },
      { loc: 'https://globalscalesub.com/affiliates', lastmod: '2025-11-09', changefreq: 'monthly', priority: 0.5 },
      { loc: 'https://globalscalesub.com/terms-of-service', lastmod: '2025-11-09', changefreq: 'yearly', priority: 0.3 },
      { loc: 'https://globalscalesub.com/privacy-policy', lastmod: '2025-11-09', changefreq: 'yearly', priority: 0.3 },
      { loc: 'https://globalscalesub.com/cookie-policy', lastmod: '2025-11-09', changefreq: 'yearly', priority: 0.3 },
      { loc: 'https://globalscalesub.com/community-guidelines', lastmod: '2025-11-09', changefreq: 'yearly', priority: 0.3 },
      { loc: 'https://globalscalesub.com/security', lastmod: '2025-11-09', changefreq: 'monthly', priority: 0.4 },
      { loc: 'https://globalscalesub.com/accessibility', lastmod: '2025-11-09', changefreq: 'monthly', priority: 0.4 },
      { loc: 'https://globalscalesub.com/sitemap', lastmod: '2025-11-09', changefreq: 'weekly', priority: 0.2 },
      { loc: 'https://globalscalesub.com/profile', lastmod: '2025-11-09', changefreq: 'weekly', priority: 0.6 },
      { loc: 'https://globalscalesub.com/business-registration', lastmod: '2025-11-09', changefreq: 'monthly', priority: 0.5 },
      { loc: 'https://globalscalesub.com/post-ad', lastmod: '2025-11-09', changefreq: 'monthly', priority: 0.7 },
      { loc: 'https://globalscalesub.com/my-ads', lastmod: '2025-11-09', changefreq: 'daily', priority: 0.6 },
      { loc: 'https://globalscalesub.com/favourites', lastmod: '2025-11-09', changefreq: 'daily', priority: 0.6 },
      { loc: 'https://globalscalesub.com/chat', lastmod: '2025-11-09', changefreq: 'daily', priority: 0.5 },
      { loc: 'https://globalscalesub.com/business-dashboard', lastmod: '2025-11-09', changefreq: 'daily', priority: 0.7 },
      { loc: 'https://globalscalesub.com/analytics', lastmod: '2025-11-09', changefreq: 'daily', priority: 0.6 },
      { loc: 'https://globalscalesub.com/admin', lastmod: '2025-11-09', changefreq: 'daily', priority: 0.4 }
    ];

    const sitemapXML = generateSitemapXML([...staticPages, ...dynamicUrls]);

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemapXML);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Internal Server Error');
  }
};
