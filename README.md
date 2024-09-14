## NextStep
![NextStep](./public/nextstepjs.png)

**NextStep** is a lightweight onboarding library for Next.js applications, inspired by [Onborda](https://github.com/uixmat/onborda). 

It utilizes [framer-motion](https://www.framer.com/motion/) for animations and [tailwindcss](https://tailwindcss.com/) for styling. 

The library allows user to use custom cards (tooltips) for easier integration.

- **[Demo App](https://nextstepjs.vercel.app)**
- **[Demo repository](https://github.com/enszrlu/NextStep-Website)**

## Getting Started

```bash
# npm
npm i nextstepjs
# pnpm
pnpm add nextstepjs
# yarn
yarn add nextstepjs
# bun
bun add nextstepjs
```

### Global `layout.tsx`
Wrap your application in `NextStepProvider` and supply the `steps` array to NextStep.

```typescriptreact
<NextStepProvider>
  <NextStep steps={steps}>
    {children}
  </NextStep>
</NextStepProvider>
```

### Tailwind Config

Tailwind CSS needs to scan the node module to include the used classes. See [configuring source paths](https://tailwindcss.com/docs/content-configuration#configuring-source-paths) for more information.

> **Note**: This is only required if you're **not using** a custom component.



```typescript
const config: Config = {
  content: [
    './node_modules/nextstepjs/dist/**/*.{js,ts,jsx,tsx}' // Add this
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
import type { CardComponentProps } from "nextstepjs";

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

### Tours Array

NextStep supports multiple "tours", allowing you to create multiple product tours:

```typescriptreact
import { Tour } from 'nextstepjs';

const steps : Tour[] = [
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
| `showSkip`       | `boolean`                       | Optional. Determines whether skip button should be shown if using the default card.           |
| `pointerPadding` | `number`                        | Optional. The padding around the pointer (keyhole) highlighting the target element.             |
| `pointerRadius`  | `number`                        | Optional. The border-radius of the pointer (keyhole) highlighting the target element.           |
| `nextRoute`      | `string`                        | Optional. The route to navigate to using `next/navigation` when moving to the next step.                      |
| `prevRoute`      | `string`                        | Optional. The route to navigate to using `next/navigation` when moving to the previous step.                  |

> **Note** `NextStep` handles card cutoff from screen sides. If side is right or left and card is out of the viewport, side would be switched to `top`. If side is top or bottom and card is out of the viewport, then side would be flipped between top and bottom.

### Target Anything

Target anything in your app using the element's `id` attribute.

```typescriptreact
<div id="nextstep-step1">Onboard Step</div>
```

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
        showSkip: true,
        pointerPadding: 10,
        pointerRadius: 10,
        nextRoute: "/foo",
        prevRoute: "/bar"
      },
      {
        icon: <>🎉</>,
        title: "Tour 1, Step 2",
        content: <>First tour, second step</>,
        selector: "#tour1-step2",
        side: "top",
        showControls: true,
        showSkip: true,
        pointerPadding: 10,
        pointerRadius: 10,
      }
    ]
  },
  {
    tour: "secondtour",
    steps: [
      {
        icon: <>🚀</>,
        title: "Second tour, Step 1",
        content: <>Second tour, first step!</>,
        selector: "#nextstep-step1",
        side: "top",
        showControls: true,
        showSkip: true,
        pointerPadding: 10,
        pointerRadius: 10,
        nextRoute: "/foo",
        prevRoute: "/bar"
      }
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
| `clickThroughOverlay` | `boolean` | Optional. If true, overlay background is not clickable, default is false


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
  clickThroughOverlay={false}
>
  {children}
</NextStep>
```

## useNextStep Hook

useNextStep hook allows you to control the tour from anywhere in your app.

```typescriptreact
import { useNextStep } from 'nextstepjs';
....

const { startNextStep, closeNextStep } = useNextStep();

const onClickHandler = (tourName: string) => {
  startNextStep(tourName);
};
```

## Keyboard Navigation

NextStep supports keyboard navigation:

- Right Arrow: Next step
- Left Arrow: Previous step
- Escape: Skip tour

## Localization

NextStep is a lightweight library and does not come with localization support. However, you can easily switch between languages by supplying the `steps` array based on locale.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.