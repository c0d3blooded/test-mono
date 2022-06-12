import React from 'react';
import { HiCheck, HiCheckCircle } from 'react-icons/hi';
import cn from 'classnames';
import max from 'lodash.max';
import styles from './steps-indicator.module.scss';

/** a model for each step in the process */
interface StepDetail {
  label: string;
  description?: string;
}

interface Props {
  steps: Array<StepDetail>;
  activeStep: number; // the currently active ste on the screen
  completedSteps: Array<number>; // an array of the steps already completed
  onChange: (step: number) => void; // when a step is selected
}

/**
 * @returns a component which indicates the steps of a form
 */
export const StepsIndicator: React.FC<Props> = (props) => {
  /**
   * @param step the step this represents
   * @param index the index of the step in the list
   * @returns A step for the steps indicator
   */
  const renderStep = (step: StepDetail, index: number) => {
    // if this step has been completed
    const isCompletedStep = props.completedSteps.includes(index);
    // if the step is active
    const isActiveStep = props.activeStep === index;
    // conditional classnames
    const className = cn({
      'bg-green-600': isCompletedStep,
      'bg-gray-300': !isCompletedStep
    });
    const labelClassName = cn(styles.label, {
      [styles.labelActive]: isActiveStep,
      [styles.labelUpcoming]: !isCompletedStep && !isActiveStep
    });
    const stepIndicatorClassName = cn(styles.stepIndicator, {
      [styles.upcomingStepIndicator]: !isCompletedStep && !isActiveStep,
      [styles.activeStepIndicator]: isActiveStep,
      [styles.completedStepIndicator]: isCompletedStep && !isActiveStep,
      [styles.activeCompletedStepIndicator]: isCompletedStep && isActiveStep
    });
    return (
      <li key={`${index}`} className="relative pb-10">
        {/* line indicator, hide for last section */}
        {index !== props.steps.length - 1 && (
          <div
            className={`-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full ${className}`}
            aria-hidden="true"
          ></div>
        )}
        <a
          href="#"
          className="relative flex items-start group"
          aria-current={isActiveStep ? 'step' : 'false'}
          onClick={() => {
            // change the current step only if it's been completed or is the next calculated step
            if (
              (index !== props.activeStep &&
                props.completedSteps.includes(index)) ||
              max(props.completedSteps) + 1 === index
            )
              props.onChange(index);
          }}
        >
          <span
            className="h-9 flex items-center"
            aria-hidden={!isActiveStep && !isCompletedStep ? 'true' : 'false'}
          >
            {/* step indicator */}
            <span className={stepIndicatorClassName}>
              {/* Heroicon name: solid/check */}
              {isCompletedStep ? (
                <HiCheck className="w-5 h-5 text-white" />
              ) : (
                <span />
              )}
            </span>
          </span>
          <span className="ml-4 min-w-0 flex flex-col">
            {/* step label */}
            <span className={labelClassName}>{step.label}</span>
            {/* step detail */}
            {step.description && (
              <span className="text-sm text-gray-500">{step.description}</span>
            )}
          </span>
        </a>
      </li>
    );
  };
  /**
   * @param step the step this represents
   * @param index the index of the step in the list
   * @returns A step for the steps indicator for mobile
   */
  const renderStepMobile = (step: StepDetail, index: number) => {
    // if this step has been completed
    const isCompletedStep = props.completedSteps.includes(index);
    // if the step is active
    const isActiveStep = props.activeStep === index;

    const labelClassName = cn(styles.labelMobile, {
      [styles.labelMobileDefault]: !isActiveStep,
      [styles.labelMobileActive]: isActiveStep
    });
    /**
     * @returns the appropriate indicator for the section
     */
    const renderSectionIndicator = () => {
      // completed
      if (isCompletedStep)
        return (
          <HiCheckCircle className="h-full w-full text-green-600 group-hover:text-green-800" />
        );
      // active
      else if (isActiveStep)
        return (
          <>
            <span className="absolute h-4 w-4 rounded-full bg-green-200" />
            <span className="relative block w-2 h-2 bg-green-600 rounded-full" />
          </>
        );

      // upcoming
      return (
        <div className="h-2 w-2 bg-gray-300 rounded-full group-hover:bg-gray-400" />
      );
    };
    return (
      <li key={`${index}`}>
        {/* Complete Step */}
        <a href="#" className="group">
          <span className="flex items-start">
            {/* indicator */}
            <span className="flex-shrink-0 relative h-5 w-5 flex items-center justify-center">
              {renderSectionIndicator()}
            </span>
            {/* label */}
            <span className={labelClassName}>{step.label}</span>
          </span>
        </a>
      </li>
    );
  };
  return (
    <>
      {/* desktop */}
      <nav className="hidden md:block" aria-label="progress">
        <ol role="list" className="overflow-hidden max-w-xs">
          {/* render each step */}
          {props.steps.map((step, i) => renderStep(step, i))}
        </ol>
      </nav>
      {/* mobile */}
      <div className="block md:hidden py-5">
        <nav className="flex justify-center" aria-label="Progress">
          <ol role="list" className="space-y-6">
            {/* render each step */}
            {props.steps.map((step, i) => renderStepMobile(step, i))}
          </ol>
        </nav>
      </div>
    </>
  );
};
