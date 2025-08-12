import { useCallback } from 'react'

export const useCapture = () => {
  const captureElement = useCallback(async (elementId: string, filename: string = 'capture') => {
    try {
      const html2canvas = (await import('html2canvas')).default
      const element = document.getElementById(elementId)
      
      if (!element) {
        throw new Error('Element not found')
      }

      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      })

      const link = document.createElement('a')
      link.download = `${filename}.png`
      link.href = canvas.toDataURL('image/png')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Failed to capture element:', error)
      alert('캡처에 실패했습니다.')
    }
  }, [])

  const capturePage = useCallback(async (filename: string = 'page') => {
    try {
      const html2canvas = (await import('html2canvas')).default
      const doc = document.documentElement
      const body = document.body
      const width = Math.max(doc.scrollWidth, body?.scrollWidth || 0, doc.clientWidth)
      const height = Math.max(doc.scrollHeight, body?.scrollHeight || 0, doc.clientHeight)

      const canvas = await html2canvas(doc, {
        backgroundColor: '#ffffff',
        scale: 2,
        width,
        height,
        windowWidth: width,
        windowHeight: height,
        useCORS: true,
        allowTaint: true,
      })

      const link = document.createElement('a')
      link.download = `${filename}.png`
      link.href = canvas.toDataURL('image/png')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Failed to capture page:', error)
      alert('페이지 캡처에 실패했습니다.')
    }
  }, [])

  const saveAsJSON = useCallback((data: any, filename: string = 'data') => {
    try {
      const jsonString = JSON.stringify(data, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.download = `${filename}.json`
      link.href = url
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to save JSON:', error)
      alert('저장에 실패했습니다.')
    }
  }, [])

  return { captureElement, capturePage, saveAsJSON }
}