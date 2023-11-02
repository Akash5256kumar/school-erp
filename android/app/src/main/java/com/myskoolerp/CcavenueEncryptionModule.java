package com.myskoolerp;

import android.content.Intent;
import android.util.Base64;
import android.util.Log;
import android.webkit.WebView;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.myskoolerp.utility.AvenuesParams;
import com.myskoolerp.utility.RSAUtility;
import com.myskoolerp.utility.ServiceUtility;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.Cipher;

public class CcavenueEncryptionModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    String encVal;
    String vResponse;

    public CcavenueEncryptionModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "CcavenueEncryptionModule";
    }

    @ReactMethod
    public void getToast() {
        Toast.makeText(reactContext, "toast from android", Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
        // TODO: Implement some actually useful functionality
        callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
    }

    @ReactMethod
    public void encrypt(String key){
        try {

//            vResponse = key;

            ReactApplicationContext context = getReactApplicationContext();
            Intent intent = new Intent(context, CcavenueActivity.class);
//            intent.putExtra("params",postData);
            intent.putExtra("encval", key);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent);


//            if (!ServiceUtility.chkNull(vResponse).equals("")
//                    && ServiceUtility.chkNull(vResponse).toString().indexOf("ERROR") == -1) {
//                StringBuffer vEncVal = new StringBuffer("");
//                vEncVal.append(ServiceUtility.addToPostParams(AvenuesParams.AMOUNT, amount));
//                vEncVal.append(ServiceUtility.addToPostParams(AvenuesParams.CURRENCY, "INR"));
//             encVal = RSAUtility.encrypt(vEncVal.substring(0, vEncVal.length() - 1), vResponse);  //encrypt amount and currency
//                Log.e("encval-->",encVal);
//                 urlEncode("orderId",encVal,name);
//
//            }
        }catch (Exception e) {
            e.printStackTrace();
            Log.e("exception",""+e.getMessage());
        }

    }

    public void urlEncode(String OrderId, String EncodedValue,String name){


        try {
            String postData =
            AvenuesParams.ACCESS_CODE + "=" +
                    URLEncoder.encode(AvenuesParams.ACCESS_CODE_VAL, "UTF-8")
                    + "&" +
                    AvenuesParams.MERCHANT_ID + "=" +
                    URLEncoder.encode(AvenuesParams.MERCHANT_ID_VAL, "UTF-8")
                    + "&" + AvenuesParams.ORDER_ID + "=" +
                    URLEncoder.encode(OrderId, "UTF-8") +
                    "&" + AvenuesParams.REDIRECT_URL + "=" +
                    URLEncoder.encode(AvenuesParams.REDIRECT_URL_VAL, "UTF-8") +
                    "&" + AvenuesParams.CANCEL_URL + "=" +
                    URLEncoder.encode(AvenuesParams.REDIRECT_URL_VAL,"UTF-8") +
                    "&" +
                            AvenuesParams.ENC_VAL + "=" +
                    URLEncoder.encode(EncodedValue, "UTF-8")
                    +"&"+
                    AvenuesParams.BILL_NAME+"="+URLEncoder.encode(name,"UTF-8")+"&"+
                    AvenuesParams.BILL_COUNTRY+"="+URLEncoder.encode("India","UTF-8")
//                    +"&"+
//                    AvenuesParams.BILL_EMAIL+"="+URLEncoder.encode(email,"UTF-8")+"&"+
//                    AvenuesParams.BILL_PHONE_NUMBER+"="+URLEncoder.encode(phone,"UTF-8");
            ;

         Log.e("post_data",postData);
            ReactApplicationContext context = getReactApplicationContext();
            Intent intent = new Intent(context, CcavenueActivity.class);
            intent.putExtra("params",postData);
            intent.putExtra("encval", vResponse);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
//            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
            context.startActivity(intent);

        } catch (UnsupportedEncodingException e) {
        }

    }
}