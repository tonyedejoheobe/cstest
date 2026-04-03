# Dog Food Product Page - React Project

Hey! So this is a landing page I built for a dog food brand. Its basically a full product page for showcasing their products with a responsive design (or at least I tried my best lol).

## What This Thing Does

This is a single-page React application built with TypeScript and Tailwind CSS. The main goal was to create a beautiful product page that works smoothly on both desktop and mobile devices.

### Main Features

- **Hero Section** - Has a cool heading and 4 feature cards arranged around a central circular image
- **Interactive Image Slider** - This was fun to build! Its an image comparison slider where you can hover (or swipe on mobile) to see the difference between regular kibble and their raw food ingredients. Really helps show the product difference visually
- **Multiple Content Sections** - Nutrition stats, GI health info, prebiotics section, etc. All with alternating image/text layouts
- **Fully Responsive** - Works on mobile, tablet, desktop. Spent extra time making sure mobile experience was smooth

## Tech Stack

- React 18 (using TypeScript)
- Tailwind CSS v4
- Vite for bundling
- Lucide React for icons

## Project Structure

```
src/
├── app/
│   ├── App.tsx                    # Main component (entry point)
│   └── components/
│       ├── FeatureCard.tsx        # Reusable card for features like "Real Food", "Made Fresh"
│       ├── StatCard.tsx           # Those percentage cards (97%, 84%, etc)
│       ├── CTAButton.tsx          # Orange CTA buttons throughout page
│       └── ImageComparisonSlider.tsx  # The interactive slider component
```

### Component Breakdown

**FeatureCard** - Pretty straightforward, just displays an icon, title and description. Used for the 4 main features (Real Food, Made Fresh, Premium Ingredient, Vet Developed).

**StatCard** - Shows the big percentage numbers with descriptions. Has responsive sizing so it looks good on mobile too.

**CTAButton** - Reusable button component with the orange/coral color scheme. Made it so it spans full width on mobile which is better UX.

**ImageComparisonSlider** - This one took some time. It handles both mouse hover and touch events. Basically you move your cursor (or finger) across the image and it reveals the overlay image. Resets back to 50% when you stop interacting. Added a little white divider line with a circular handle so people know its interactive.

## Design Choices

### Semantic HTML & CSS
I used proper semantic elements throughout (`<section>`, `<main>`, etc) instead of just divs everywhere. Also tried to use human-readable class names when possible, though Tailwind makes that a bit tricky sometimes.

### Color Scheme
- Primary CTA color: `#FF7A59` (that coral/orange color)
- Background alternates between white and `gray-50`
- Icons use different colors (green, blue, amber, pink) to differentiate features

### Responsive Approach
Desktop has the cool 2x2 grid layout with the circular image in the center. On mobile I completely changed it - image comes first, then features stack vertically. Also made images appear before text content on mobile because people respond better to visuals on smaller screens.

The image comparison slider works on both desktop (mouse) and mobile (touch), which was important for engagement.

## How to Run

Should be pretty standard:

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Things I'd Improve With More Time

- Could add some scroll animations (stuff fading in as you scroll)
- Maybe add lazy loading for images to improve performance
- The stats percentages could animate up from 0 when they come into view
- Could add some micro-interactions on hover states
- Accessibility could probably be improved (better aria labels, keyboard navigation for slider, etc)

---

Built with React + TypeScript + Tailwind. Hope this demonstrates my attention to detail and component architecture! Let me know if you have questions about any implementation decisions.
