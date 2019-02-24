// @flow
import React, { useState } from 'react';

const CreateTab = ({ addNewTab }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  return (
    <div>
      <div>
        name
        <input type="text" defaultValue={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        url
        <input type="text" defaultValue={url} onChange={e => setUrl(e.target.value)} />
      </div>

      <button type="button" data-test="tab-add" onClick={() => addNewTab(url ? 'rss' : 'default', name, url)}>
        create
      </button>
    </div>
  );
};

export default CreateTab;
