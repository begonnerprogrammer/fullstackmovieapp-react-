/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
    remotePatterns:[
        {
            protocol:"https",
            hostname:"lh3.googleusercontent.com",
            hostname: "image.tmdb.org"
        }
    ]
    },
    redirects(){
       return [
        {
            source:"/",
            destination:"/discover/now_playing",
            permanent:true,
        }
       ]
    }
}

module.exports = nextConfig
