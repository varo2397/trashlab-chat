import { Redirect, Stack } from 'expo-router';

import { AuthContext } from '@/context/authContext';
import { useContext } from 'react';
import Loader from '@/components/loader';

const HomeLayout = () => {
  const { isLoading, user } = useContext(AuthContext);
  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack />;
}

export default HomeLayout;
