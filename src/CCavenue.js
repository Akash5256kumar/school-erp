import {NativeModules} from 'react-native';

 NativeModules.CcavenueEncryptionModule.getDeviceName((err ,name) => {
    console.log(err, name);
 });