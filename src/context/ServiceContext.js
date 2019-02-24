// @flow

import { createContext } from 'react';
import ApiService from '@/services/ApiService';
import StorageService from '@/services/StorageService';

const ServiceContext = createContext({ api: ApiService, storage: StorageService });

export default ServiceContext;
