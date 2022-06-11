import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SurveyAnswers } from '@treelof/models';
import Button from '../../common/button';
import Card from '../../common/card';
import CheckboxGroup from '../../common/checkbox-group';
import { SignUpContext } from '../context';

/**
 * @returns the additional information section of the sign up form
 */
const SignUpAdditionalInformation = () => {
  const [saving, setSaving] = useState(false);
  const { onNextStep, onFormStateValidated } = useContext(SignUpContext);
  const { handleSubmit } = useForm();
  const { formState } = useForm<SurveyAnswers>({});
  const { isValid } = formState;
  /* Save the form and continue */
  const onSubmit = async () => {
    setSaving(true);
    // continue to next step
    onNextStep();
    setSaving(false);
  };
  // callback for form state
  useEffect(() => {
    onFormStateValidated(2, isValid);
  }, [isValid, onFormStateValidated]);
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CheckboxGroup
          label="App Use"
          description="What will you be using the app for?"
          options={[
            {
              id: 'manage-market',
              label: 'Managing one or more farmers markets'
            },
            { id: 'educate-farmers', label: 'To educate local farmers' },
            {
              id: 'manage-csa',
              label: 'Manage one or more CSA (community supported agriculture)'
            },
            {
              id: 'storefront',
              label:
                'Provide storefront software for vendors at farmers markets'
            },
            // in place to capture unknown uses,
            {
              id: 'other',
              label: 'Other'
            }
          ]}
          // onChange={() => {}}
          multi
        />
        <div className="mt-5">
          <CheckboxGroup
            label="Contributing Role"
            description="What describes you best?"
            options={[
              {
                id: 'small-farmer',
                label: 'Small/Urban-Ag Farmer (1-5 acres)'
              },
              { id: 'mid-farmer', label: 'Mid-sized Farmer (5-100 acres)' },
              { id: 'large-farmer', label: 'Large Farmer (100+ acres)' },
              { id: 'market-overseer', label: "Farmer's Market Overseer" },
              {
                id: 'market-vendor',
                label: 'Farmers Market Vendor'
              },
              {
                id: 'manager-csa',
                label: 'CSA Manager'
              },
              {
                id: 'educator',
                label: 'Argicultural educator'
              },
              {
                id: 'sponsor-partner',
                label: 'Sponsor/Partner'
              },
              // in place to capture unknown roles
              {
                id: 'other',
                label: 'Other'
              }
            ]}
            // onChange={() => {}}
          />
        </div>
        <div className="flex justify-end mt-8">
          {/* save the form as a draft */}
          <Button buttonProps={{ type: 'button' }} outlined>
            Save Draft
          </Button>
          {/* complete form */}
          <Button
            buttonProps={{ type: 'submit', className: 'ml-3' }}
            loading={saving}
          >
            Continue
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default SignUpAdditionalInformation;
