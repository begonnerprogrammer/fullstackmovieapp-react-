/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
    remotePatterns:[
        {
            protocol:"https",
            hostname:"**",
            
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
