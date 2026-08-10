import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo'
import { email, linkedinUrl, modelFamilies, surfaces } from '@/lib/content'

export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: 'en-US',
        publisher: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
        email,
        jobTitle: 'AI-fluent QA & operations generalist',
        description: SITE_DESCRIPTION,
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'The Atlanta Art Institute',
        },
        knowsAbout: [
          'Quality assurance',
          'Customer support',
          'Artificial intelligence tools',
          ...surfaces,
          ...modelFamilies,
        ],
        sameAs: [linkedinUrl, `${SITE_URL}/Katie-Kinkel-Resume.pdf`],
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: SITE_NAME,
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
