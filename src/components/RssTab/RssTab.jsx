// @flow

import React, { useEffect, useState, useContext, useCallback } from 'react';
import ServiceContext from '@/context/ServiceContext';

type PropsType = {
  url: string,
};
const RssTab = ({ url }: PropsType) => {
  const { api } = useContext(ServiceContext);
  const [rss, setUrl] = useState(null);

  const getRss = useCallback(async url => {
    setUrl(await api.getRss(url));
  });

  useEffect(() => {
    getRss(url);
  }, []);

  return (
    <div>
      <h1>{url}</h1>
      {rss}
    </div>
  );
};

export default RssTab;
