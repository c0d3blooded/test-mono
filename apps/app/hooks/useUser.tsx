import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback
} from 'react';
import { Session, User, Provider, ApiError } from '@supabase/supabase-js';
import first from 'lodash.first';
import { supabase } from '../lib/supabase-client';
import { getProfilesByUuid, table as profile_table } from '../services/profile';
import { Profile } from '@treelof/models';
import { copyObject, isObjectEmpty } from '../utils/common';

type UserContextType = {
  session: Session | null;
  user: User | null;
  // function to refresh the profile list
  refreshProfiles: (uid: string) => void;
  profile: Profile | null;
  loggedIn: boolean;
  loading: boolean; // the user is loading
  error?: string | null;
  signIn: (options: SignInOptions) => Promise<{
    session: Session | null;
    user: User | null;
    provider?: Provider | undefined;
    url?: string | null | undefined;
    error: ApiError | null;
  }>;
  signUp: (options: SignUpOptions) => Promise<{
    user: User | null;
    session: Session | null;
    error: ApiError | null;
  }>;
  signOut: () => void;
};

type SignInOptions = {
  email?: string;
  password?: string;
  provider?: Provider;
};

type SignUpOptions = {
  email: string;
  password: string;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface Props {
  children?: (value: UserContextType) => React.ReactNode;
}
// the provider component extending the user context
export const UserContextProvider: React.FC<Props> = (props) => {
  const [session, setSession] = useState<Session | null>(null); // the supabase session
  const [user, setUser] = useState<User | null>(null); // the supabase {User} model
  const [profiles, setProfiles] = useState<Array<Profile> | null>(null); // the app user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(); // if there is an error searching for a user profile

  useEffect(() => {
    // get the current supabase auth session
    const session = supabase.auth.session();
    const user = session?.user;
    setSession(session);
    setUser(user ?? null);
    // loading is done if there is no existing user
    if (!session) setLoading(false);
    // when the authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );
    // unsubscribe from auth state
    return () => authListener?.unsubscribe();
  }, []);

  const refreshProfiles = useCallback(
    (uid: string) => {
      // when there is a currently logged in user
      getProfilesByUuid(uid).then(({ data, error }) => {
        // if there was an error finding the user data
        if (error) {
          setError('Could not find user profile');
          console.error('Could not find user profile');
          signOut();
        }
        // validate the user has already created a profile
        else setProfiles(data);
        // session and profile data has loaded
        setLoading(false);
      });
      // subscribe to profile updates
      const subscription = supabase
        .from<Profile>(`${profile_table}:linked_to=eq.${uid}`)
        .on('UPDATE', (payload) => {
          const newProfile = payload.new as Profile;
          // replaces the value in the old profiles list
          const newProfiles = profiles?.map((p) =>
            p.uuid === newProfile.uuid ? copyObject(newProfile) : p
          );
          setProfiles(newProfiles ?? null);
        })
        .subscribe();
      return () => subscription.unsubscribe();
    },
    [profiles]
  );

  useEffect(() => {
    // when there is not a currently logged in user
    if (user) refreshProfiles(user.id);
  }, [user, refreshProfiles]);

  /**
   * Universal login with an OAuth provider which returns a session and user on successful login
   * @param session the session from the callback
   * @param user the user from the callback
   */
  const loginWithOath = (session: Session, user: User) => {
    setSession(session);
    setUser(user);
  };

  /**
   * Completely sign the user out
   * @returns the Promise of the supabase logout
   */
  const signOut = () => {
    setProfiles(null);
    return supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    refreshProfiles,
    profile: profiles ? first(profiles) : null,
    loggedIn: Boolean(session) && !isObjectEmpty(profiles || []),
    loading,
    error,
    loginWithOath,
    signIn: (options: SignInOptions) => supabase.auth.signIn(options),
    signUp: (options: SignUpOptions) => supabase.auth.signUp(options),
    signOut
  };

  return (
    <UserContext.Provider value={value} {...props}>
      {/* pass value to immediate children */}
      {props.children(value)}
    </UserContext.Provider>
  );
};

/**
 * @returns custom hook with information for the currently logged in user
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error(`useUser must be used within a UserContextProvider.`);
  return context;
};
