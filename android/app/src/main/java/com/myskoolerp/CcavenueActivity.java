package com.myskoolerp;

import android.content.Context;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;


import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.myskoolerp.utility.AvenuesParams;
import com.myskoolerp.utility.Constants;
import com.myskoolerp.utility.LoadingDialog;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public class CcavenueActivity extends ReactActivity {
  Context context;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ccavenue);
        context=CcavenueActivity.this;
        WebView webview = (WebView) findViewById(R.id.webview);
        webview.getSettings().setJavaScriptEnabled(true);
        webview.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);

//      webview.addJavascriptInterface(new MyJavaScriptInterface(), "HTMLOUT");
        webview.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(webview, url);
                LoadingDialog.cancelLoading();
                WritableMap params1 = Arguments.createMap();

//                if (url.indexOf("https://payments.dhurina.net/cc_payment_status/Failure") != -1) {
//                    params1.putString("status", "fail");
//                } else if (url.indexOf("https://payments.dhurina.net/cc_payment_status/Success") != -1) {
//
//
//                    params1.putString("status", "success");
//                } else {
//                    params1.putString("status", "cancelled");
//
//                }
//                Log.e("params", params1 + "");

                if (getReactInstanceManager().getCurrentReactContext() != null) {

                    Log.e("context","is not null");
//                    getReactInstanceManager().getCurrentReactContext()
//                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                            .emit("Transaction_status", params1);

                    ReactInstanceManager reactInstanceManager = getReactNativeHost().getReactInstanceManager();
                    ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
                    if(reactContext != null)
                    {
                        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("Transaction_status", params1);
                    }
                    else {

                        reactInstanceManager.addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
                            @Override
                            public void onReactContextInitialized(ReactContext context) {
                                context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                        .emit("Transaction_status", params1);
                                reactInstanceManager.removeReactInstanceEventListener(this);
                            }
                        });
                    }

                }
                else
                {
                    Log.e("context","isnull");
                }
            }

            @Override

            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {

                Log.e("error", description + "," + failingUrl + "," + errorCode);
            }

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
                Log.e("page", "started" + url);
                LoadingDialog.showLoadingDialog(CcavenueActivity.this, "Loading...");
            }
        });


        try {
//            String postData = getIntent().getStringExtra("params");
            String encVal = getIntent().getStringExtra("encval");
            Log.e("url-->", Constants.TRANS_URL + encVal + "&access_code="+ AvenuesParams.ACCESS_CODE_VAL);
//            webview.postUrl(Constants.TRANS_URL + encVal + "&access_code="+ AvenuesParams.ACCESS_CODE_VAL, postData.getBytes());
            webview.loadUrl(Constants.TRANS_URL + encVal + "&access_code="+ AvenuesParams.ACCESS_CODE_VAL);
        } catch (Exception e) {


        }

    }


    class MyJavaScriptInterface {
        @JavascriptInterface
        public void processHTML(String html) {
            // process the html source code to get final status of transaction

            String status = null;
            if (html.indexOf("Failed") != -1) {
                status = "Transaction Declined!";
            } else if (html.indexOf("Success") != -1) {
                status = "Transaction Successful!";
            } else if (html.indexOf("Aborted") != -1) {
                status = "Transaction Cancelled!";
            } else {
                status = "Status Not Known!";
            }


            WritableMap params2 = Arguments.createMap();
            params2.putString("status", status);

            ReactInstanceManager reactInstanceManager = getReactNativeHost().getReactInstanceManager();
            ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
            if(reactContext != null) {
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("Transaction_status", params2);
            } else {

                reactInstanceManager.addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
                    @Override
                    public void onReactContextInitialized(ReactContext context) {
                        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("Transaction_status", params2);
                        reactInstanceManager.removeReactInstanceEventListener(this);
                    }
                });
            }
            if(status.equalsIgnoreCase("Transaction Declined!"))
            {
               finish();
            }

        }
    }


    @Override
    public void onBackPressed() {
//        super.onBackPressed();
        finish();
    }
}
