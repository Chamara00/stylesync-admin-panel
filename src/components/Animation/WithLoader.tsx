import React, { ComponentType, useEffect, useState } from 'react';
import Loader from './Loader';

interface WithLoaderProps {
  delay?: number;
}

const withLoader = <P extends object>(WrappedComponent: ComponentType<P>, delay: number = 700) => {
  return function WithLoaderComponent(props: P & WithLoaderProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, delay);

      return () => clearTimeout(timer);
    }, [delay]);

    if (loading) {
      return <Loader />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withLoader;
