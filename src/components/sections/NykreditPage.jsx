import { useEffect, useRef } from 'react'
import useReveal from '../../hooks/useReveal'
import './NykreditPage.css'

const BASE = import.meta.env.BASE_URL
const S = `${BASE}assets/nykredit/cases/`

const CASES = [
  {
    id: 'rollups',
    label: 'Roll-ups',
    num: '01',
    desc: 'Design of physical promotional materials and exhibition assets.',
    images: [
      `${S}rollups/Page 1.png`,
      `${S}rollups/Page 2.png`,
      `${S}rollups/Page 3.png`,
      `${S}rollups/Page 4.png`,
      `${S}rollups/Page 5.png`,
    ],
    layout: 'grid-auto'
  },
  {
    id: 'some',
    label: 'Social media',
    num: '02',
    desc: 'Templates and creative posts for social platforms.',
    images: [
      `${S}some/1000x15000-1.png`,
      `${S}some/1000x15000.png`,
      `${S}some/1080x1080_youngMoney.png`,
      `${S}some/Group 5586.png`,
      `${S}some/image-1.png`,
      `${S}some/image.png`,
    ],
    layout: 'grid-auto'
  },
  {
    id: 'merchandise',
    label: 'Merchandise',
    num: '03',
    desc: 'Branded merchandise, apparel, and corporate gifts.',
    images: [`${S}merchandise/Image 1.png`],
    layout: 'single'
  },
  {
    id: 'invites',
    label: 'Invitations',
    num: '04',
    desc: 'Digital and print event invitations and collateral.',
    images: [`${S}invites/Page 2.png`, `${S}invites/Page 5.png`],
    layout: 'grid-2'
  },
  {
    id: 'faktaark',
    label: 'Fact sheets',
    num: '05',
    desc: 'Information dense financial fact sheets built for accessibility.',
    images: [`${S}faktaark/Frame 5584.png`, `${S}faktaark/Frame 5585.png`, `${S}faktaark/Frame 5586.png`],
    layout: 'grid-auto'
  },
  {
    id: 'calendars',
    label: 'Calendars',
    num: '06',
    desc: 'Annual branded calendars distributed across the group.',
    images: [`${S}calendars/Group 1181.png`],
    layout: 'single'
  },
  {
    id: 'adshel',
    label: 'Adshels & outdoor advertising',
    num: '07',
    desc: 'Large format outdoor advertisements and bus shelter posters.',
    images: [`${S}adshel/Frame 5601.png`],
    layout: 'single'
  },
  {
    id: 'image_library',
    label: 'Image library',
    num: '08',
    desc: 'Curating, color-grading and managing the central brand image library.',
    images: [`${S}image_library/Frame 5601.png`],
    layout: 'single'
  },
  {
    id: 'website_modules',
    label: 'Website modules',
    num: '09',
    desc: 'Component design and layout modules for the public website.',
    images: [`${S}website_modules/Frame 5601.png`],
    layout: 'single'
  },
  {
    id: 'website_banners',
    label: 'Website banners',
    num: '10',
    desc: 'Digital banners for campaigns across external media.',
    images: [
      `${S}website_banners/Frame 5603.png`,
      `${S}website_banners/Invest_Hero_2590x1190.png`,
      `${S}website_banners/NykreditInvest_2590x1190.png`,
      `${S}website_banners/PrivateBanking_damemedarmeneivejret_Hero_2590x1190.png`,
      `${S}website_banners/TeslaMette_2590x1190.png`,
    ],
    layout: 'stack'
  },
  {
    id: 'ui_components',
    label: 'UI components & states',
    num: '11',
    desc: 'Detailed UI components and interaction states for internal tools.',
    images: [`${S}ui_components/Group 5582.png`, `${S}ui_components/Ledige stillinger formular, BP x-large.png`],
    layout: 'stack'
  },
  {
    id: 'app_design',
    label: 'App design',
    num: '12',
    desc: 'Mobile application interface design and prototyping.',
    images: [
      `${S}app_design/Ipad app - forside.png`,
      `${S}app_design/Ipad app - loading screen.png`,
      `${S}app_design/Ipad app - aflevering.png`,
      `${S}app_design/Ipad app - afleveret.png`,
    ],
    layout: 'grid-2'
  },
  {
    id: 'design_guide',
    label: 'Design guide',
    num: '13',
    desc: 'Maintaining the central design system and brand guidelines in Frontify.',
    images: [
      `${S}design_guide/Desktop_Episerver_Farver_ Opdateret_25_Marts_2025.png`,
      `${S}design_guide/Desktop_Episerver_Typografi_ Opdateret_25_Marts_2025.png`,
      `${S}design_guide/Desktop_Episerver_logo_ Opdateret_25_Marts_2025.png`,
    ],
    layout: 'stack'
  },
]

const TOOLS = ['Figma', 'Adobe Illustrator', 'InDesign', 'Photoshop', 'Frontify', 'Optimizely']

export default function NykreditPage({ onClose }) {
  const containerRef = useRef(null)
  
  // Apply scroll animations!
  useReveal(containerRef)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="nk-page" role="dialog" aria-label="Nykredit showcase" ref={containerRef}>
      {/* Header */}
      <header className="nk-page__header">
        <button className="nk-page__back" onClick={onClose} aria-label="Back to portfolio">
          <span className="nk-page__back-arrow">←</span>
          <span className="nk-page__back-label">Portfolio</span>
        </button>
        <div className="nk-page__header-meta">
          <span className="nk-page__header-eyebrow">02 — Experience</span>
          <span className="nk-page__header-title">Nykredit</span>
        </div>
      </header>

      <div className="nk-page__body">
        {/* Intro */}
        <section className="nk-page__intro">
          <h1 className="nk-page__heading r">Nykredit</h1>
          <p className="nk-page__meta r">Student Assistant · Design Team · June 2024 – present</p>
          <p className="nk-page__desc r">
            I joined Nykredit's in-house design team as a Student Assistant and ended up
            working on almost every format the bank produces: UI components for the public
            website, brand templates and component libraries in Frontify, fact sheets tested
            for accessibility, plus print work ranging from Instagram posts to congress stands
            and beach flags. I was also there during the merger of two Danish banks, which
            meant a lot of careful work keeping the new visual identity consistent across
            the whole Nykredit Group.
          </p>
          <div className="nk-page__tools r-group">
            {TOOLS.map(t => <span key={t} className="nk-page__tag">{t}</span>)}
          </div>
        </section>

        {/* Vertical feed of work */}
        <section className="nk-page__feed">
          {CASES.map((item, i) => (
            <div key={item.id} className={`nk-case ${i % 2 === 1 ? 'nk-case--reverse' : ''}`}>
              <div className="nk-case__content r-group">
                <span className="nk-case__num">{item.num}</span>
                <h2 className="nk-case__title">{item.label}</h2>
                <p className="nk-case__desc">{item.desc}</p>
              </div>
              
              <div className={`nk-case__media nk-case__media--${item.layout} r-group`}>
                {item.images.map((src, index) => (
                  <div key={index} className="nk-case__image-wrapper">
                    <img src={src} alt={`${item.label} - image ${index + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
