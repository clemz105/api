// /api/sitemap-index.js
const baseUrl = 'https://globalscalesub.com';

// Helper to generate sitemap index XML
const generateSitemapIndexXML = (sitemaps) => {
  const sitemapElements = sitemaps
    .map(
      ({ loc, lastmod }) => `
  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>`;
};

module.exports = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    // List of all sitemaps
    const sitemaps = [
      { loc: `${baseUrl}/sitemap-pages.xml`, lastmod: today },
      { loc: `${baseUrl}/sitemap-products.xml`, lastmod: today },
      { loc: `${baseUrl}/sitemap-countries.xml`, lastmod: today },
      { loc: `${baseUrl}/sitemap-ads.xml`, lastmod: today }
    ];

    const sitemapIndexXML = generateSitemapIndexXML(sitemaps);

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemapIndexXML);
  } catch (error) {
    console.error('Error generating sitemap index:', error);
    res.status(500).send('Internal Server Error');
  }
};
