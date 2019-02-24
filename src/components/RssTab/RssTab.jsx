// @flow

import React, { useEffect, useState, useContext, useCallback } from 'react';
import { isNil } from 'ramda';
import ServiceContext from '@/context/ServiceContext';

type PropsType = {
  url: string,
};
const RssTab = ({ url }: PropsType) => {
  const { api } = useContext(ServiceContext);
  const [rss, setUrl] = useState(null);

  const getRss = useCallback(async url => {
    const data = await api.getRss(url);
    setUrl(data);
  });

  useEffect(() => {
    getRss(url);
  }, []);

  return (
    <div>
      <h1>{url}</h1>
      {!isNil(rss) && <div data-test="rss-content">{rss}</div>}
    </div>
  );
};

export default RssTab;
