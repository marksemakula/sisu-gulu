# MultiRoute Tour Navigator

MultiRoute Tour Navigator is a React component that extends the functionality of Tour Navigator by providing the ability to create multi-route tours for React websites. Tour Navigator to be installed alongside this package.

## Installation

To use MultiRoute Tour Navigator, make sure you have `tour-navigator` installed in your project:

```bash
npm install tour-navigator multiroute-tour-navigator
# or
yarn add tour-navigator multiroute-tour-navigator
```

## Usage
Import MultiRouteTour from multiroute-tour-navigator and use it in your React components to define multi-route tours.
```javascript
import { MultiRouteTour } from 'multiroute-tour-navigator';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const MyComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <MultiRouteTour
      id="my-tour"
      steps={[ /* Array of steps */ ]}
      state={location?.state?.tour} // we won't have state for first page
      nextStepRoute="/about"
      onNavigate={(route, state) => navigate(route, {state: {tour: state}, replace: true}) //  include state while navigating
      nextStepCount={4}
      number={2}
    />
  );
};
```
## Props
`MultiRouteTour` component accepts props similar to TourNavigator, along with additional props specific to multi-route tours:

| Prop               | Type    | Description                                                                                        |
|--------------------|---------|----------------------------------------------------------------------------------------------------|
| nextStepCount      | number  | Number of steps after transitioning to the next route.                                             |
| nextStepRoute      | string  | Route to navigate to after completing the current tour on this route.                              |
| number             | number  | Number representing the current route in the multi-route tour. If not provided, it will automatically take the next route in sequence. |
| replace            | boolean | Whether to replace the current route in history while navigating. Default: false.                  |
| state              | array   | State from previous tour page                                                
| onNavigate         | (route, state) => {}   | Function invokes when tour is completed for current page pass state while navigate to next tour. |
| ref                | 
| ...                | -       | Other props from TourNavigatorProps                                                                |


### MultiRouteTourRefProps

```typescript
interface MultiRouteTourRefProps {
  id: string;
  currentStep: Step | null;
  target: HTMLElement | null;
  currentStepIndex: number;
  previousStepIndex: number;
  steps: Step[] | null;
  isScrollingIntoView: boolean;
  focus: (scrollBehavior?: 'auto' | 'smooth') => void;
  goto: (stepIndex: number) => void;
  next: () => void;
  prev: () => void;
  onRequestClose: (params: { event: MouseEvent | PointerEvent; isMask: boolean; isOverlay: boolean }) => void;
}
```

## License

This project is licensed under the [MIT](LICENSE).
