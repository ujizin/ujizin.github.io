(($) => {
    'use strict'

    const socialLinks = $.querySelectorAll('.social-network-list a[href]')
    const knownNetworks = new Set([
        'twitch',
        'youtube',
        'linkedin',
        'github',
        'twitter'
    ])

    const getHostName = (url) => {
        try {
            return new URL(url).hostname.replace(/^www\./, '')
        } catch (error) {
            return 'unknown'
        }
    }

    const resolveSocialNetwork = (link) => {
        const fromDataset = (link.dataset.socialNetwork || '').trim().toLowerCase()
        if (fromDataset) {
            return fromDataset
        }

        const fromClass = Array.from(link.classList).find((name) => knownNetworks.has(name))
        if (fromClass) {
            return fromClass
        }

        return getHostName(link.href)
    }

    const trackSocialLinkClick = (link) => {
        if (typeof window.gtag !== 'function') {
            return
        }

        const socialNetwork = resolveSocialNetwork(link)
        window.gtag('event', 'social_link_click', {
            social_platform: socialNetwork,
            link_url: link.href,
            link_host: getHostName(link.href),
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
