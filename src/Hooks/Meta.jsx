import React from "react";

/**
 * Hook for rendering metadata tags in React 19
 */
const useMetadata = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType = "website",
  canonicalUrl,
  jsonLd,
}) => {
  // Default JSON-LD for personal website
  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sean Blackwell",
    url: "https://sean-blackwell.com",
    image: "https://sean-blackwell.com/assets/cartoonIcon.svg",
    jobTitle: "Developer, Designer, & Educator",
    worksFor: {
      "@type": "Organization",
      name: "Self-employed",
    },
    sameAs: [
      "https://github.com/bwellsean",
      "https://www.linkedin.com/in/sean-blackwell/",
      "https://www.facebook.com/seanmblackwell",
    ],
  };

  const structuredData = jsonLd || defaultJsonLd;

  return (
    <>
      <title>
        {title
          ? `${title} - Sean Blackwell`
          : `Sean Blackwell - Developer, Designer, & Educator`}
      </title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </>
  );
};

export default useMetadata;
