# CV

`cv.html` is the source of the CV. After editing it, regenerate the PDF with Chrome and copy it to `public/`:

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --no-pdf-header-footer \
  --allow-file-access-from-files --virtual-time-budget=6000 \
  --print-to-pdf="cv/Ali-Raza-CV.pdf" "file:///D:/Programming/Ali Raza Software Engineer/cv/cv.html"
cp cv/Ali-Raza-CV.pdf public/Ali-Raza-CV.pdf
```

Keep it to 2 pages: each `.page` is a fixed A4 sheet, so anything that doesn't fit is cut off — check both pages after editing.
