import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo'
import {
  email,
  experience,
  jobTitle,
  linkedinUrl,
  modelFamilies,
  surfaces,
} from '@/lib/content'

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
        jobTitle,
        description: SITE_DESCRIPTION,
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'The Atlanta Art Institute',
        },
        knowsAbout: [
          'AI QA',
          'LLM evaluation',
          'Human-in-the-loop review',
          'AI-assisted operations',
          'Quality assurance',
          'Customer support',
          ...surfaces,
          ...modelFamilies,
        ],
        sameAs: [linkedinUrl, SITE_URL, `${SITE_URL}/Katie-Kinkel-AI-QA-Resume.pdf`],
        hasOccupation: {
          '@type': 'Occupation',
          name: jobTitle,
          occupationLocation: {
            '@type': 'Place',
            name: 'Remote',
          },
        },
        worksFor: experience.slice(0, 2).map((job) => ({
          '@type': 'Organization',
          name: job.company,
          description: `${job.title} (${job.duration})`,
        })),
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: `${SITE_NAME} — ${jobTitle}`,
        description: SITE_DESCRIPTION,
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
