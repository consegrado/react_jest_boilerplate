// @flow
import nanoid from 'nanoid';
import { useMemo, useState, useCallback } from 'react';
import { isNil } from 'ramda';
import logger from '@/lib/logger';

const useTabs = storage => {
  const intialState = useMemo(() => {
    return (
      (storage.get('demoTabState') && JSON.parse(storage.get('demoTabState'))) || [
        {
          id: nanoid(3),
          name: 'Test 1',
          type: 'default',
        },
        {
          id: nanoid(3),
          name: 'Test 2',
          type: 'default',
        },
      ]
    );
  });
  const [state, setState] = useState(intialState);

  const removeTab = useCallback(tabId => e => {
    e.preventDefault();
    logger(`remove tab ${tabId}`, state);
    setState(item => {
      const newState = item.filter(tab => tab.id !== tabId);
      storage.set('demoTabState', newState);
      return newState;
    });
  });

  const addNewTab = useCallback((type: string, name, url?: string) => {
    switch (type) {
      case 'rss': {
        const newId = nanoid(3);
        logger(`add tab ${newId}`, state);
        setState(item => {
          const newState = [...item, { type: 'rss', name, url, id: newId }];
          if (!isNil(storage)) {
            storage.set('demoTabState', newState);
            storage.set('demoTabIndex', newState.length - 1);
          }
          return newState;
        });
        break;
      }
      default: {
        const newId = nanoid(3);
        logger(`add tab ${newId}`, state);
        setState(items => {
          const newState = [...items, { type: 'default', name, id: newId }];

          if (!isNil(storage)) {
            storage.set('demoTabState', newState);
            storage.set('demoTabIndex', newState.length - 1);
          }

          return newState;
        });
      }
    }
  });

  return {
    state,
    addNewTab,
    removeTab,
  };
};

export default useTabs;
