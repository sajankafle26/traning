/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://sangalotech.com.np",
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: [
        "/adminpanel/*",
        "/dashboard/*",
        "/student-dashboard/*",
        "/studentlogin",
        "/signup",
        "/cart",
        "/checkout",
        "/payment-failure",
        "/test-upload",
        "/api/*",
    ],
};
