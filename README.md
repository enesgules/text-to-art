# Text to Art

Create beautiful text visuals with dynamic shader backgrounds. A minimalist, browser-based tool for generating art from typography.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

### Current

- **Dynamic WebGL Shaders** - 5 animated background effects (Gradient, Noise, Waves, Plasma, Voronoi)
- **Curated Typography** - 8 hand-picked display fonts optimized for visual impact
- **Real-time Preview** - Fullscreen canvas with instant style updates
- **Export Options** - Download as PNG in multiple aspect ratios (1:1, 16:9, 9:16, 4:3)
- **Text Styling** - Bold, italic, underline with 5 size presets
- **Color Control** - Dual color picker for shader customization

### Fonts

| Font | Style | Best For |
|------|-------|----------|
| Playfair Display | Elegant serif | Quotes, poetry |
| Space Grotesk | Geometric sans | Modern, tech |
| Cormorant Garamond | Editorial serif | Literary, classical |
| Bebas Neue | Condensed display | Headlines, impact |
| Caveat | Handwritten | Personal, casual |
| Archivo Black | Heavy sans | Bold statements |
| Merriweather | Readable serif | Longer text |
| Montserrat | Versatile sans | All-purpose |

### Shaders

| Effect | Description |
|--------|-------------|
| Gradient | Smooth rotating color flow |
| Noise | Organic simplex noise patterns |
| Waves | Sinusoidal wave distortions |
| Plasma | Classic demoscene plasma |
| Voronoi | Animated cell patterns |

---

## Roadmap

### Phase 1: Core Improvements

- [ ] **Keyboard shortcuts** - `Cmd+S` to save, `Cmd+B` for bold, etc.
- [ ] **Undo/Redo** - History stack for all changes
- [ ] **Text color picker** - Currently fixed to white
- [ ] **Multiple text layers** - Add multiple text elements with independent styling
- [ ] **Text positioning** - Drag to reposition, alignment options (center, top, bottom)
- [ ] **Preset themes** - Curated color + shader combinations

### Phase 2: Visual Enhancements

- [ ] **Mesh gradients** - Multi-point gradient blending (like Figma/Canva)
- [ ] **Grain/noise overlay** - Film grain texture on export
- [ ] **Blur effects** - Gaussian blur on background
- [ ] **Additional shaders**:
  - Fractal noise (FBM)
  - Aurora/Northern lights
  - Liquid/fluid simulation
  - Geometric patterns (hexagons, triangles)
  - Bokeh/light particles
  - Gradient mesh
- [ ] **Animation export** - GIF/MP4 of animated shader
- [ ] **Custom shader input** - Paste GLSL code or Shadertoy link

### Phase 3: Typography

- [ ] **More fonts** - Expand to 20+ curated options
- [ ] **Variable fonts** - Weight/width sliders for supported fonts
- [ ] **Letter spacing** - Tracking control
- [ ] **Line height** - Leading control for multi-line text
- [ ] **Text effects**:
  - Outline/stroke
  - Shadow with customizable offset, blur, color
  - Gradient fill
  - Glow effect
- [ ] **Text presets** - Pre-styled text combinations
- [ ] **Google Fonts browser** - Search and add any Google Font

### Phase 4: UX Polish

- [ ] **Responsive controls** - Collapsible panel, mobile drawer
- [ ] **Dark/light mode toggle** - For the UI controls
- [ ] **Randomize button** - Generate random color + shader combinations
- [ ] **Share link** - URL-encoded state for sharing designs
- [ ] **Templates gallery** - Pre-made designs to start from
- [ ] **Recent colors** - Color history palette
- [ ] **Fullscreen mode** - Hide all controls for presentation

### Phase 5: Export & Integration

- [ ] **Higher resolution export** - 2K, 4K options
- [ ] **SVG export** - Vector output (text only, gradient background)
- [ ] **Copy to clipboard** - One-click copy as image
- [ ] **Social sharing** - Direct share to Twitter, Instagram
- [ ] **Watermark option** - Add custom watermark
- [ ] **Batch export** - Export all aspect ratios at once
- [ ] **API access** - Programmatic generation

### Phase 6: Advanced Features

- [ ] **Account system** - Save designs to cloud
- [ ] **Design history** - Browse and restore previous versions
- [ ] **Collaboration** - Share and co-edit in real-time
- [ ] **AI suggestions** - Color palette recommendations based on text sentiment
- [ ] **Custom fonts upload** - Use your own .ttf/.otf files
- [ ] **Background image upload** - Use photo as background with shader overlay

---

## Design Inspiration

This project draws inspiration from:

- **[Linear](https://linear.app)** - Minimalist dark UI with subtle borders
- **[Awwwards Minimal](https://www.awwwards.com/websites/minimal/)** - Clean, purposeful design
- **[Shadertoy](https://www.shadertoy.com)** - WebGL shader techniques
- **[The Book of Shaders](https://thebookofshaders.com)** - GLSL fundamentals
- **[Colorffy](https://colorffy.com)** - Mesh gradient generation
- **[MagicPattern](https://www.magicpattern.design)** - Gradient tools

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State**: Zustand
- **Graphics**: Raw WebGL with custom GLSL shaders
- **Fonts**: next/font with Google Fonts
- **UI Components**: shadcn/ui

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to start creating.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Font loading (8 fonts)
│   ├── page.tsx            # Main page
│   └── globals.css         # Tailwind + theme
├── components/
│   ├── canvas/
│   │   └── ShaderBackground.tsx
│   ├── controls/
│   │   ├── ControlPanel.tsx
│   │   ├── FontSelector.tsx
│   │   ├── FontSizeSelector.tsx
│   │   ├── TextStyleToggles.tsx
│   │   ├── ShaderSelector.tsx
│   │   ├── ColorControls.tsx
│   │   ├── AspectRatioSelector.tsx
│   │   └── DownloadButton.tsx
│   └── TextDisplay.tsx
├── hooks/
│   └── useExport.ts
├── lib/
│   ├── shaders/            # GLSL shader code
│   │   ├── index.ts
│   │   ├── gradient.ts
│   │   ├── noise.ts
│   │   ├── waves.ts
│   │   ├── plasma.ts
│   │   └── voronoi.ts
│   ├── fonts.ts
│   └── constants.ts
├── store/
│   └── canvas-store.ts     # Zustand store
└── types/
    └── index.ts
```

---

## License

MIT
