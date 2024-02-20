import { CancelToken } from 'axios';
import { instance } from './index'
import {SettingsType} from '../store/models/SettingsType'

const getSettings = ( sourceToken?: CancelToken) =>
    instance.get<SettingsType[]>(
        '/settings/',
        { cancelToken: sourceToken }
);

const endpoints = {
    getSettings
};
export default endpoints;
      