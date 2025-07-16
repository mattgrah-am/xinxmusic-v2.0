import { music } from '~/utils/music'

export default defineEventHandler(async (event) => {
  const baseUrl = 'https://xinxmusic.com'
  
  // Generate URLs for albums
  const albumUrls = [...new Set(music.map(song => song.album))]
    .map(album => `${baseUrl}/album/${encodeURIComponent(album.toLowerCase().replace(/\s+/g, '-'))}`)
  
  // Generate URLs for individual songs
  const songUrls = music.map(song => 
    `${baseUrl}/song/${song.id}/${encodeURIComponent(song.title.toLowerCase().replace(/\s+/g, '-'))}`
  )
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${albumUrls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
  ${songUrls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return sitemap
})