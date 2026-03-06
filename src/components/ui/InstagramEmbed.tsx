'use client'

import { useEffect, useRef } from 'react'

interface InstagramEmbedProps {
  url: string
  className?: string
}

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

export function InstagramEmbed({ url, className }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Normalize URL: strip query params, ensure it ends with /
  const cleanUrl = url.split('?')[0].replace(/\/?$/, '/')

  useEffect(() => {
    const loadAndProcess = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process()
        return
      }
      const script = document.createElement('script')
      script.src = 'https://www.instagram.com/embed.js'
      script.async = true
      script.defer = true
      script.onload = () => {
        window.instgrm?.Embeds.process()
      }
      document.body.appendChild(script)
    }

    loadAndProcess()
  }, [url])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
    >
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={cleanUrl}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: '0',
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '0',
          maxWidth: '540px',
          minWidth: '326px',
          padding: '0',
          width: '100%',
        }}
      >
        <div style={{ padding: '16px' }}>
          <a
            href={cleanUrl}
            style={{
              background: '#FFFFFF',
              lineHeight: '0',
              padding: '0 0',
              textAlign: 'center',
              textDecoration: 'none',
              width: '100%',
            }}
            target="_blank"
            rel="noreferrer"
          >
            View on Instagram
          </a>
        </div>
      </blockquote>
    </div>
  )
}
