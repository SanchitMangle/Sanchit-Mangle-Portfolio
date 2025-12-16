import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
    const siteTitle = 'Sanchit Mangle |Fullstack Developer';
    const defaultDescription = 'Portfolio of Sanchit Mangle, a Fullstack Developer specializing in creating premium, interactive, and modern web experiences.';
    const defaultKeywords = 'Sanchit Mangle, Portfolio, Fullstack Developer, Web Developer, React, Next.js, UI/UX, Frontend Developer, Backend Developer, Fullstack Developer';
    const siteUrl = 'https://sanchit-mangle-portfolio.vercel.app';
    const defaultImage = '/og-image.png'; // Assuming you might have one, or we can use a screenshot later. 

    const finalTitle = title ? `${title} | Sanchit Mangle` : siteTitle;
    const finalDescription = description || defaultDescription;
    const finalKeywords = keywords || defaultKeywords;
    const finalImage = image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`;
    const finalUrl = url ? `${siteUrl}${url}` : siteUrl;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />
            <link rel="canonical" href={finalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={finalUrl} />
            <meta property="twitter:title" content={finalTitle} />
            <meta property="twitter:description" content={finalDescription} />
            <meta property="twitter:image" content={finalImage} />
        </Helmet>
    );
};

export default SEO;
