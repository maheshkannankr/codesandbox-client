import React from 'react';
import { WorkspaceFlowLayout } from './Layout';
import { StepProps, WorkspaceSetupStep } from './types';
import { Create } from './steps/Create';
import { Plans } from './steps/Plans';
import { PlanOptions } from './steps/PlanOptions';
import { Payment } from './steps/Payment';
import { SelectWorkspace } from './steps/SelectWorkspace';

export type WorkspaceSetupProps = {
  steps: WorkspaceSetupStep[];
  startFrom?: WorkspaceSetupStep; // when this isn't passed, first one from the array is used
  onComplete: () => void;
  onDismiss: () => void;
};

export const WorkspaceSetup: React.FC<WorkspaceSetupProps> = ({
  steps,
  startFrom,
  onComplete,
  onDismiss,
}) => {
  const startFromIndex = startFrom ? steps.indexOf(startFrom) : 0;
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(
    startFromIndex
  );

  const currentStep = steps[currentStepIndex];
  const Component = STEP_COMPONENTS[currentStep];

  if (currentStepIndex >= steps.length) {
    onComplete();
    return null;
  }

  return (
    <WorkspaceFlowLayout>
      <Component
        currentStep={currentStepIndex}
        numberOfSteps={steps.length}
        onPrevStep={() => setCurrentStepIndex(crtStepIndex => crtStepIndex - 1)}
        onNextStep={() => setCurrentStepIndex(crtStepIndex => crtStepIndex + 1)}
        onEarlyExit={onComplete}
        onDismiss={onDismiss}
      />
    </WorkspaceFlowLayout>
  );
};

export const STEP_COMPONENTS: Record<
  WorkspaceSetupStep,
  React.FC<StepProps>
> = {
  create: Create,
  'select-workspace': SelectWorkspace,
  plans: Plans,
  'plan-options': PlanOptions,
  payment: Payment,
};
