(($) => {
    'use strict'

    const socialLinks = $.querySelectorAll('.social-network-list a[href]')

    const trackSocialLinkClick = (link) => {
        if (typeof window.gtag !== 'function') {
            return
        }

        const socialNetwork = link.dataset.socialNetwork || 'unknown'
        window.gtag('event', 'social_link_click', {
            social_network: socialNetwork,
            link_url: link.href,
            outbound: true,
            transport_type: 'beacon'
        })
    }

    socialLinks.forEach((link) => {
        link.addEventListener('click', () => {
            trackSocialLinkClick(link)
        })
    })
})(document)
