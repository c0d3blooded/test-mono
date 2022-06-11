import React, { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from '../lib/supabase-client';
import { AppInformation } from '../models/app-information';
import { useUser } from './useUser';
import { table as app_information_table } from '../services/app-information';

type AppInformationContextType = {
  appInformation: AppInformation | null;
  loading: boolean; // the app information is loading
  error?: string | null;
};

export const AppInformationContext = createContext<
  AppInformationContextType | undefined
>(undefined);

interface Props {
  children?: React.ReactNode;
}
// the provider component extending the user context
export const AppInformationProvider: React.FC<Props> = (props) => {
  const { profile } = useUser();
  const [appInformation, setAppInformation] = useState<AppInformation | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(); // if there is an error searching for a user profile

  useEffect(() => {
    // when there is not a currently logged in user
    if (profile?.app_information_id)
      supabase
        .from<AppInformation>(app_information_table)
        .select('*')
        .eq('id', profile?.app_information_id)
        .single()
        .then(({ data, error }) => {
          // if there was an error finding the user data
          if (error) setError('Could not find app information');
          // validate the user has already created a profile
          else setAppInformation(data);
          // session and profile data has loaded
          setLoading(false);
        });
  }, [profile?.app_information_id]);

  return (
    <AppInformationContext.Provider
      value={{
        appInformation,
        loading,
        error
      }}
      {...props}
    />
  );
};

/**
 * @returns custom hook with information for the currently logged in user
 */
export const useAppInformation = () => {
  const context = useContext(AppInformationContext);
  if (context === undefined)
    throw new Error(
      `useAppInformation must be used within a AppInformationProvider.`
    );
  return context;
};
