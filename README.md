# NextStep - Lightweight Next.js Onboarding Library

NextStep is a lightweight onboarding library for Next.js applications, inspired by [Onborda](https://github.com/uixmat/onborda). It utilizes [framer-motion](https://www.framer.com/motion/) for animations and [tailwindcss](https://tailwindcss.com/) for styling. The library provides fully customizable pointers (tooltips) that can be easily integrated with [shadcn/ui](https://ui.shadcn.com/) for modern web applications.

- **Demo - [nextstep.vercel.app](https://nextstep.vercel.app)**
- **[Demo repository](https://github.com/enszrlu/NextStep-website)**

## Coming soon

- Analytics hooks
- Customisable card component
- Keyboard navigation
- Progress persistence
- Skip functionality

## Getting Started

```bash
# npm
npm i nextstep
# pnpm
pnpm add nextstep
# yarn
yarn add nextstep
```

### Global `layout.tsx`

```typescriptreact
<NextStepProvider>
  <NextStep steps={steps}>
    {children}
  </NextStep>
</NextStepProvider>
```

### Components & `page.tsx`

Target anything in your app using the element's `id` attribute.

```typescriptreact
<div id="nextstep-step1">Onboard Step</div>
```

### Tailwind Config

Tailwind CSS needs to scan the node module to include the used classes. See [configuring source paths](https://tailwindcss.com/docs/content-configuration#configuring-source-paths) for more information.

> **Note**: This is only required if you're **not using** a custom component.



```typescript
const config: Config = {
  content: [
    './node_modules/nextstep/dist/**/*.{js,ts,jsx,tsx}' // Add this
  ]
}
```

### Custom Card

You can create a custom card component for greater control over the design:


| Prop          | Type             | Description                                                          |
|---------------|------------------|----------------------------------------------------------------------|
| `step`         | `Object`          | The current `Step` object from your steps array, including content, title, etc.         |
| `currentStep`   | `number`         | The index of the current step in the steps array.                    |
| `totalSteps`    | `number`         | The total number of steps in the onboarding process.                 |
| `nextStep`      |                  | A function to advance to the next step in the onboarding process.    |
| `prevStep`      |                  | A function to go back to the previous step in the onboarding process.|
| `arrow`         |                  | Returns an SVG object, the orientation is controlled by the steps side prop |
| `skipTour`         |                  | A function to skip the tour |

```typescriptreact
"use client"
import type { CardComponentProps } from "nextstep";

export const CustomCard = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  skipTour,
  arrow,
}: CardComponentProps) => {
  return (
    <div>
      <h1>{step.icon} {step.title}</h1>
      <h2>{currentStep} of {totalSteps}</h2>
      <p>{step.content}</p>
      <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
      <button onClick={skipTour}>Skip</button>
      {arrow}
    </div>
  )
}
```

### Steps Object

NextStep supports multiple "tours", allowing you to create multiple product tours:

```typescriptreact
const steps = [
  {
    tour: "firstTour",
    steps: [
      // Step objects
    ],
  },
  {
    tour: "secondTour",
    steps: [
      // Step objects
    ],
  }
];
```

### Step Object

| Prop           | Type                          | Description                                                                           |
|----------------|-------------------------------|---------------------------------------------------------------------------------------|
| `icon`           | `React.ReactNode`, `string`, `null` | An icon or element to display alongside the step title.                                |
| `title`          | `string`                        | The title of your step                     |
| `content`        | `React.ReactNode`               | The main content or body of the step.                                                 |
| `selector`       | `string`                        | Optional. A string used to target an `id` that this step refers to. If not provided, card will be displayed in the center top of the document body.            |
| `side`           | `"top"`, `"bottom"`, `"left"`, `"right"` | Optional. Determines where the tooltip should appear relative to the selector.          |
| `showControls`   | `boolean`                       | Optional. Determines whether control buttons (next, prev) should be shown if using the default card.           |
| `pointerPadding` | `number`                        | Optional. The padding around the pointer (keyhole) highlighting the target element.             |
| `pointerRadius`  | `number`                        | Optional. The border-radius of the pointer (keyhole) highlighting the target element.           |
| `nextRoute`      | `string`                        | Optional. The route to navigate to using `next/navigation` when moving to the next step.                      |
| `prevRoute`      | `string`                        | Optional. The route to navigate to using `next/navigation` when moving to the previous step.                  |

> **Note** _Both `nextRoute` and `prevRoute` have a `500`ms delay before setting the next step, a function will be added soon to control the delay in case your application loads slower than this._

### Example `steps`

```tsx
[
  {
    tour: "firsttour",
    steps: [
      {
        icon: <>👋</>,
        title: "Tour 1, Step 1",
        content: <>First tour, first step</>,
        selector: "#tour1-step1",
        side: "top",
        showControls: true,
        pointerPadding: 10,
        pointerRadius: 10,
        nextRoute: "/foo",
        prevRoute: "/bar"
      }
      ...
    ]
  },
  {
    tour: "secondtour",
    steps: [
      icon: <>👋👋</>,
        title: "Second tour, Step 1",
        content: <>Second tour, first step!</>,
        selector: "#nextstep-step1",
        side: "top",
        showControls: true,
        pointerPadding: 10,
        pointerRadius: 10,
        nextRoute: "/foo",
        prevRoute: "/bar"
    ]
  }
]
```

### NextStep Props

| Property | Type | Description
|-----|-----|-----
| `children` | `React.ReactNode` | Your website or application content
| `steps` | `Array[]` | Array of Tour objects defining each step of the onboarding
| `showNextStep` | `boolean` | Controls visibility of the onboarding overlay
| `shadowRgb` | `string` | RGB values for the shadow color surrounding the target area
| `shadowOpacity` | `string` | Opacity value for the shadow surrounding the target area
| `cardComponent` | `React.ComponentType` | Custom card component to replace the default one
| `cardTransition` | `Transition` | Framer Motion transition object for step transitions
| `onStepChange` | `(step: number) => void` | Callback function triggered when the step changes
| `onComplete` | `() => void` | Callback function triggered when the tour completes
| `onSkip` | `() => void` | Callback function triggered when the user skips the tour


```typescriptreact
<NextStep
  steps={steps}
  showNextStep={true}
  shadowRgb="55,48,163"
  shadowOpacity="0.8"
  cardComponent={CustomCard}
  cardTransition={{ duration: 0.5, type: "spring" }}
  onStepChange={(step) => console.log(`Step changed to ${step}`)}
  onComplete={() => console.log("Tour completed")}
  onSkip={() => console.log("Tour skipped")}
>
  {children}
</NextStep>
```

## Keyboard Navigation

NextStep supports keyboard navigation:

- Right Arrow: Next step
- Left Arrow: Previous step
- Escape: Skip tour

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.