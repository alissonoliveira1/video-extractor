const express = require('express');
const app = express();
const https = require('https');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const url = 'COLOQUE A URL DO SITE AQUI';


(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.3');

  await page.goto(url, { timeout: 60000 });


  const html = await page.content();

 
  const $ = cheerio.load(html);


  const sources = $('source');
  const videos = $('video');


  sources.each((index, element) => {
    const src = $(element).attr('src');
    console.log(`Source ${index + 1}: ${src}`);
  });

 
  videos.each((index, element) => {
    const src = $(element).attr('src');
    console.log(`Video ${index + 1}: ${src}`);
  });

  
  await browser.close();
})();
app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
// Inicia o servidor
