'use client'

import { useEffect } from 'react'

export default function SmartHeader() {
  useEffect(() => {
    const CONFIG = {
      headerSelector: '.main-header',
      hideOffset: 100,
      tolerance: 10,
    }

    let lastScrollY = window.scrollY
    let ticking = false
    let isHeaderHidden = false
    let touchStartY = 0

    const header = document.querySelector<HTMLElement>(CONFIG.headerSelector)

    if (!header) return

    const headerEl = header

    function hideHeader() {
      isHeaderHidden = true
      headerEl.classList.remove('site-header--visible')
      headerEl.classList.add('site-header--hidden')
    }

    function showHeader() {
      isHeaderHidden = false
      headerEl.classList.remove('site-header--hidden')
      headerEl.classList.add('site-header--visible')
    }

    function updateHeader(currentScrollY: number) {
      const scrollDelta = currentScrollY - lastScrollY
      const absScrollDelta = Math.abs(scrollDelta)

      if (currentScrollY <= 0) {
        showHeader()
        lastScrollY = currentScrollY
        ticking = false
        return
      }

      if (absScrollDelta < CONFIG.tolerance) {
        ticking = false
        return
      }

      const pastHideOffset = currentScrollY > CONFIG.hideOffset

      if (scrollDelta > 0 && pastHideOffset && !isHeaderHidden) {
        hideHeader()
      } else if (scrollDelta < 0 && isHeaderHidden) {
        showHeader()
      }

      headerEl.classList.toggle('site-header--scrolled', pastHideOffset)

      lastScrollY = currentScrollY
      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateHeader(window.scrollY)
        })
        ticking = true
      }
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY
    }

    function onTouchMove(e: TouchEvent) {
      const touchY = e.touches[0].clientY
      const touchDelta = touchStartY - touchY

      if (Math.abs(touchDelta) > 5) {
        if (touchDelta > 0 && !isHeaderHidden) {
          if (window.scrollY > CONFIG.hideOffset) {
            hideHeader()
          }
        } else if (touchDelta < 0 && isHeaderHidden) {
          showHeader()
        }
      }
    }

    function onResize() {
      lastScrollY = window.scrollY
    }

    function onVisibilityChange() {
      if (!document.hidden) {
        lastScrollY = window.scrollY
      }
    }

    if (window.scrollY > CONFIG.hideOffset) {
      headerEl.classList.add('site-header--scrolled')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return null
}