const fetch = require('node-fetch');
const cheerio = require('cheerio')
const { exec } = require('child_process');
let fs = require ('fs');
let websiteLink;

async function getData(url){
    fetch(url)
    .then((data) =>{
        const html = data.text()
        return html;
    })

    .then((html) =>{
        const links = [];
        const scripts = [];
        const $ = cheerio.load(html)
        
        $('a[href]').each((i, elem) => {
            if($(elem).attr('href').indexOf(websiteLink)){
                links.push($(elem).attr('href'))
                links.join(`\r\n\t,`)
            }
        })

        $('script').each((i, elem) =>{
            if($(elem).attr('src')){
                scripts.push($(elem).attr('src'))
                scripts.join(' , ')
            }
        })

        function uploadData(file, fileLinks){
            fs.writeFile(`${file}`, fileLinks, (err)=>{
                if(err){
                    console.log(err)
                }
                exec(`cat ~/Desktop/${file} | nc termbin.com 9999`, (err, stdout, stderr) =>{
                    if(err){
                        console.log(err)
                    }
    
                    console.log(`links: ${stdout}`)
                    
                })
    
            })
        } 

        uploadData('links.txt', links)
        uploadData('scripts.txt', scripts)
        
    })

    .catch((error) =>{
        console.log(error);
    })
    
}


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  readline.question(`Url: `, (webUrl) => {
    websiteLink = webUrl;
    getData(webUrl)
    readline.close()
  })
  
