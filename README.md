## NextStep

![NextStep](./public/nextstepjs.png)

**NextStep** is a lightweight onboarding library for Next.js / React applications. It utilizes [motion](https://www.motion.dev) for smooth animations and supports multiple React frameworks including Next.js, React Router, and Remix.

**Some of the use cases:**

- **Easier Onboarding**: Guide new users with step-by-step tours
- **Engagement Boost**: Make help docs interactive, so users learn by _doing_.
- **Better Error Handling**: Skip generic toasters—show users exactly what to fix with tailored tours.
- **Event-Based Tours**: Trigger custom tours after key actions to keep users coming back.

The library allows users to use custom cards (tooltips) for easier integration.

**If you like the project, please leave a star! ⭐️⭐️⭐️⭐️⭐️**

- **[Demo App](https://nextstepjs.com)**
- **[Demo repository](https://github.com/enszrlu/NextStep-Website)**

## Getting Started

```bash
# npm
npm i nextstepjs motion
# pnpm
pnpm add nextstepjs motion
# yarn
yarn add nextstepjs motion
# bun
bun add nextstepjs motion
```

### Navigation Adapters (v2.0+)

NextStep 2.0 introduces a framework-agnostic routing system through navigation adapters. Each adapter is packaged separately to minimize bundle size - only the adapter you import will be included in your bundle.

> **Important:** Make sure to import the adapter you need in your app in order to access full functionality. Without an adapter, navigation features like `nextRoute` and `prevRoute` may not work properly.

#### Built-in Adapters

##### Next.js

NextStep uses Next.js adapter as default, therefore you don't need to import it.

```tsx
// app/layout.tsx or pages/_app.tsx
import { NextStep, NextStepProvider } from 'nextstepjs';

export default function Layout({ children }) {
  return (
    <NextStepProvider>
      <NextStep steps={steps}>{children}</NextStep>
    </NextStepProvider>
  );
}
```

##### React Router as a Framework

```tsx
//app/root.tsx
import { NextStepProvider, NextStepReact, type Tour } from 'nextstepjs';
import { useReactRouterAdapter } from 'nextstepjs/adapters/react-router';

export default function App() {
  return (
    <NextStepProvider>
      <NextStepReact navigationAdapter={useReactRouterAdapter} steps={steps}>
        <Outlet />
      </NextStepReact>
    </NextStepProvider>
  );
}
```

##### Remix

```tsx
// root.tsx
import { NextStepProvider, NextStepReact } from 'nextstepjs';
import { useRemixAdapter } from 'nextstepjs/adapters/remix';

export default function App() {
  return (
    <NextStepProvider>
      <NextStepReact navigationAdapter={useRemixAdapter} steps={steps}>
        <Outlet />
      </NextStepReact>
    </NextStepProvider>
  );
}
```

##### Important Configuration for Vite (React Router or Remix)

If you're using Vite with React Router or Remix, add the following configuration to your `vite.config.ts`:

```ts
export default defineConfig({
  ssr: {
    noExternal: ['nextstepjs', 'motion'],
  },
});
```

##### Custom Navigation Adapter

You can create your own navigation adapter for any routing solution by implementing the `NavigationAdapter` interface:

```tsx
import { NextStepReact } from 'nextstepjs';
import type { NavigationAdapter } from 'nextstepjs';

const useCustomAdapter = (): NavigationAdapter => {
  return {
    push: (path: string) => {
      // Your navigation logic here
      // Example: history.push(path)
    },
    getCurrentPath: () => {
      // Your path retrieval logic here
      // Example: window.location.pathname
      return window.location.pathname;
    },
  };
};

const App = () => {
  return (
    <NextStepReact navigationAdapter={useCustomAdapter} steps={steps}>
      {children}
    </NextStepReact>
  );
};
```

#### Troubleshooting

If you encounter an error related to module exports when using the Pages Router, it is likely due to a mismatch between ES modules (which use `export` statements) and CommonJS modules (which use `module.exports`). The `nextstepjs` package uses ES module syntax, but your Next.js project might be set up to use CommonJS.

To resolve this issue, ensure that your Next.js project is configured to support ES modules. You can do this by updating your `next.config.js` file to include the following configuration:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: true,
  },
  transpilePackages: ['nextstepjs'],
};

export default nextConfig;
```

### Custom Card

You can create a custom card component for greater control over the design:

| Prop          | Type     | Description                                                                     |
| ------------- | -------- | ------------------------------------------------------------------------------- |
| `step`        | `Object` | The current `Step` object from your steps array, including content, title, etc. |
| `currentStep` | `number` | The index of the current step in the steps array.                               |
| `totalSteps`  | `number` | The total number of steps in the onboarding process.                            |
| `nextStep`    |          | A function to advance to the next step in the onboarding process.               |
| `prevStep`    |          | A function to go back to the previous step in the onboarding process.           |
| `arrow`       |          | Returns an SVG object, the orientation is controlled by the steps side prop     |
| `skipTour`    |          | A function to skip the tour                                                     |
| `validationError` | `string \| null` | Current validation error message (if any)                                    |
| `isValidating` | `boolean` | Whether validation is currently in progress                                    |

```tsx
'use client';
import type { CardComponentProps } from 'nextstepjs';

export const CustomCard = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  skipTour,
  arrow,
  validationError,
  isValidating,
}: CardComponentProps) => {
  return (
    <div>
      <h1>
        {step.icon} {step.title}
      </h1>
      <h2>
        {currentStep} of {totalSteps}
      </h2>
      <p>{step.content}</p>
      <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep} disabled={isValidating}>
        {isValidating ? 'Validating...' : 'Next'}
      </button>
      <button onClick={skipTour}>Skip</button>
      {validationError && (
        <div style={{ color: 'red', marginTop: '0.5rem' }}>
          {validationError}
        </div>
      )}
      {arrow}
    </div>
  );
};
```

### Tours Array

NextStep supports multiple "tours", allowing you to create multiple product tours:

```tsx
import { Tour } from 'nextstepjs';

const steps: Tour[] = [
  {
    tour: 'firstTour',
    steps: [
      // Step objects
    ],
  },
  {
    tour: 'secondTour',
    steps: [
      // Step objects
    ],
  },
];
```

### Step Object

| Prop                   | Type                                     | Description                                                                                                                                         |
| ---------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `icon`                 | `React.ReactNode`, `string`, `null`      | An icon or element to display alongside the step title.                                                                                             |
| `title`                | `string`                                 | The title of your step                                                                                                                              |
| `content`              | `React.ReactNode`                        | The main content or body of the step.                                                                                                               |
| `selector`             | `string`                                 | Optional. A string used to target an `id` that this step refers to. If not provided, card will be displayed in the center top of the document body. |
| `side`                 | `"top"`, `"bottom"`, `"left"`, `"right"` | Optional. Determines where the tooltip should appear relative to the selector.                                                                      |
| `showControls`         | `boolean`                                | Optional. Determines whether control buttons (next, prev) should be shown if using the default card.                                                |
| `showSkip`             | `boolean`                                | Optional. Determines whether skip button should be shown if using the default card.                                                                 |
| `blockKeyboardControl` | `boolean`                                | Optional. Determines whether keyboard control should be blocked                                                                                     |
| `pointerPadding`       | `number`                                 | Optional. The padding around the pointer (keyhole) highlighting the target element.                                                                 |
| `pointerRadius`        | `number`                                 | Optional. The border-radius of the pointer (keyhole) highlighting the target element.                                                               |
| `nextRoute`            | `string`                                 | Optional. The route to navigate to when moving to the next step.                                                                                    |
| `prevRoute`            | `string`                                 | Optional. The route to navigate to when moving to the previous step.                                                                                |
| `viewportID`           | `string`                                 | Optional. The id of the viewport element to use for positioning. If not provided, the document body will be used.                                   |
| `validation`           | `StepValidation`                        | Optional. Custom validation function to ensure user completes required actions before proceeding. See [Validation System](#validation-system) for details. |

> **Note** `NextStep` handles card cutoff from screen sides. If side is right or left and card is out of the viewport, side would be switched to `top`. If side is top or bottom and card is out of the viewport, then side would be flipped between top and bottom.

### Validation System

NextStep includes a powerful validation system that allows you to ensure users complete required actions before proceeding to the next step. This is particularly useful for steps that require users to open modals, fill forms, or perform specific interactions.

#### Basic Usage

Add a `validation` object to any step that requires validation:

```tsx
{
  icon: '📋',
  title: 'Open Modal',
  content: 'Click the button to open the modal',
  selector: '#modal-button',
  validation: {
    validate: () => {
      // Your validation logic here
      return isModalOpen; // must return boolean or Promise<boolean>
    },
    errorMessage: 'Please open the modal before continuing',
    required: true, // optional, defaults to true
  },
}
```

#### Validation Interface

```tsx
interface StepValidation {
  validate: () => boolean | Promise<boolean>;
  errorMessage?: string;
  required?: boolean;
}
```

#### Examples

**Check if modal is open:**
```tsx
validation: {
  validate: () => {
    const modal = document.querySelector('.modal');
    return modal && !modal.classList.contains('hidden');
  },
  errorMessage: 'The modal needs to be open to continue',
}
```

**Check form field:**
```tsx
validation: {
  validate: () => {
    const input = document.querySelector('#email-input') as HTMLInputElement;
    return input && input.value.trim().length > 0;
  },
  errorMessage: 'Please fill in the email field',
}
```

**Async validation:**
```tsx
validation: {
  validate: async () => {
    try {
      const response = await fetch('/api/validate');
      return response.ok;
    } catch {
      return false;
    }
  },
  errorMessage: 'Validation failed. Please try again.',
}
```

**React state validation:**
```tsx
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const steps: Tour[] = [
  {
    tour: 'dropdown-tour',
    steps: [
      {
        validation: {
          validate: () => isDropdownOpen,
          errorMessage: 'Open the dropdown to continue',
        },
      },
    ],
  },
];
```

#### Behavior

- **Validation triggers** when user clicks "Next"
- **Visual feedback** shows "Validating..." during validation
- **Error messages** appear in the card if validation fails
- **Automatic cleanup** of error states when changing steps
- **Performance optimized** - validations only run when needed

For more detailed information, see the [Validation System Documentation](./src/docs/validation-feature.md).

### Target Anything

Target anything in your app using the element's `id` attribute.

```tsx
<div id="nextstep-step1">Onboard Step</div>
```

### Routing During a Tour

NextStep allows you to navigate between different routes during a tour using the `nextRoute` and `prevRoute` properties in the step object. These properties enable seamless transitions between different pages or sections of your application.

- `nextRoute`: Specifies the route to navigate to when the "Next" button is clicked.
- `prevRoute`: Specifies the route to navigate to when the "Previous" button is clicked.

When `nextRoute` or `prevRoute` is provided, NextStep will use Next.js's `next/navigation` to navigate to the specified route.

### Using NextStepViewport and viewportID

When a selector is in a scrollable area, it is best to wrap the content of the scrollable area with `NextStepViewport`. This component takes `children` and an `id` as prop. By providing the `viewportID` to the step, NextStep will target this element within the viewport. This ensures that the step is anchored to the element even if the container is scrollable.

Here's an example of how to use `NextStepViewport`:

```tsx
<div className="relative overflow-auto h-64">
  <NextStepViewport id="scrollable-viewport">{children}</NextStepViewport>
</div>
```

### Example `steps`

```tsx
[
  {
    tour: 'firsttour',
    steps: [
      {
        icon: <>👋</>,
        title: 'Tour 1, Step 1',
        content: <>First tour, first step</>,
        selector: '#tour1-step1',
        side: 'top',
        showControls: true,
        showSkip: true,
        pointerPadding: 10,
        pointerRadius: 10,
        nextRoute: '/foo',
        prevRoute: '/bar',
      },
      {
        icon: <>🎉</>,
        title: 'Tour 1, Step 2',
        content: <>First tour, second step</>,
        selector: '#tour1-step2',
        side: 'top',
        showControls: true,
        showSkip: true,
        pointerPadding: 10,
        pointerRadius: 10,
        viewportID: 'scrollable-viewport',
      },
    ],
  },
  {
    tour: 'secondtour',
    steps: [
      {
        icon: <>🚀</>,
        title: 'Second tour, Step 1',
        content: <>Second tour, first step!</>,
        selector: '#nextstep-step1',
        side: 'top',
        showControls: true,
        showSkip: true,
        pointerPadding: 10,
        pointerRadius: 10,
        nextRoute: '/foo',
        prevRoute: '/bar',
      },
    ],
  },
];
```

### NextStep & NextStepReact Props

| Property              | Type                                               | Description                                                                                                   |
| --------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `children`            | `React.ReactNode`                                  | Your website or application content                                                                           |
| `steps`               | `Array[]`                                          | Array of Tour objects defining each step of the onboarding                                                    |
| `navigationAdapter`   | `NavigationAdapter`                                | Optional. Router adapter for navigation (defaults to Next.js on NextStep and window adapter on NextStepReact) |
| `showNextStep`        | `boolean`                                          | Controls visibility of the onboarding overlay                                                                 |
| `shadowRgb`           | `string`                                           | RGB values for the shadow color surrounding the target area                                                   |
| `shadowOpacity`       | `string`                                           | Opacity value for the shadow surrounding the target area                                                      |
| `cardComponent`       | `React.ComponentType`                              | Custom card component to replace the default one                                                              |
| `cardTransition`      | `Transition`                                       | Motion transition object for step transitions                                                                 |
| `onStart`             | `(tourName: string \| null) => void`               | Callback function triggered when the tour starts                                                              |
| `onStepChange`        | `(step: number, tourName: string \| null) => void` | Callback function triggered when the step changes                                                             |
| `onComplete`          | `(tourName: string \| null) => void`               | Callback function triggered when the tour completes                                                           |
| `onSkip`              | `(step: number, tourName: string \| null) => void` | Callback function triggered when the user skips the tour                                                      |
| `clickThroughOverlay` | `boolean`                                          | Optional. If true, overlay background is clickable, default is false                                          |
| `disableConsoleLogs`  | `boolean`                                          | Optional. If true, console logs are disabled, default is false                                                |
| `scrollToTop`         | `boolean`                                          | Optional. If true, the page will scroll to the top when the tour ends, default is true                        |
| `noInViewScroll`      | `boolean`                                          | Optional. If true, the page will not scroll to the target element when it is in view, default is false        |

```tsx
<NextStep
  steps={steps}
  showNextStep={true}
  shadowRgb="55,48,163"
  shadowOpacity="0.8"
  cardComponent={CustomCard}
  cardTransition={{ duration: 0.5, type: 'spring' }}
  onStepChange={(step, tourName) => console.log(`Step changed to ${step} in ${tourName}`)}
  onComplete={(tourName) => console.log(`Tour completed: ${tourName}`)}
  onSkip={(step, tourName) => console.log(`Tour skipped: ${step} in ${tourName}`)}
  clickThroughOverlay={false}
>
  {children}
</NextStep>
```

## useNextStep Hook

useNextStep hook allows you to control the tour from anywhere in your app.

```tsx
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

## Credits

- [Onborda](https://github.com/uixmat/onborda) for the inspiration and some code snippets.
