// "Download CV" click handler: on desktop, loads the PDF in a hidden frame and opens
// the browser's print dialog (where visitors can print or "Save as PDF"). On phones,
// or if printing is blocked, it opens the PDF in a new tab instead.
let frame

export function openCv(event, url) {
  event.preventDefault()
  const isTouch = window.matchMedia('(pointer: coarse)').matches
  if (isTouch) {
    window.open(url, '_blank', 'noopener')
    return
  }

  frame?.remove()
  frame = document.createElement('iframe')
  frame.title = 'CV'
  frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden'
  frame.src = url
  frame.onload = () => {
    try {
      frame.contentWindow.focus()
      frame.contentWindow.print()
    } catch {
      window.open(url, '_blank', 'noopener')
    }
  }
  document.body.appendChild(frame)
}
