# EyeSee: Image Captioning Application for the Visually Impaired

EyeSee is an mobile application meant to assist the people who are visually impaired to make out their surroundings guide them. This is my final year project submission for my university course. This repository contains both the source code for the mobile application and a pre-trained machine leaning model for image captioning (hence the large size).

**System tested on:** <br/>
**OS:** Arch Linux x86_64, Linux LTS 6.12.21, Hyprland, Wayland Compositor <br/>
**Processor:** Intel® Core™ i5-1035G1 CPU <br/>
**Memory:** 8Gb of RAM <br/>
**Graphics:** Intel Iris Plus Graphics G1 <br/>

**Software Versions:** <br/>
Python v3.11.12 <br/>
pip v24.0 <br/>
Node v23.9.0 <br/>
npm v11.2.0 <br/>

> [!warning]
> <b>THIS APPLICATION IS NOT IN DEVELOPMENT ANYMORE. IF THERE ARE ISSUES RUNNING THE CODE, REVERT TO AN OLDER VERSION OF DEPENDENCIES/PACKAGES SHOULD RESOLVE IT.</b>

---

<br>
<br>

## Installation Guide

In this section, I will walk you through on how to download the repository locally, download the necessary packages, download the necessary android package file (.apk), and configure some settings in order to make the whole system work.

### Prerequisites

This system has **multiple prerequisites that are required** in order to install all the required packages and dependencies. The list of prerequisites are as follows:
- `python` version 10.0.0 to 12.0.0 (with `pip`) as tensorflow has not supported v13.0.0. Check what version tensorflow [here](https://www.tensorflow.org/install/pip#software_requirements). Download python [here](https://www.python.org/downloads/).
- `Node.js` version 20.0.0 and above (with `node`). Download Node [here](https://nodejs.org/en/download).

<br>

### Installation Procedure

##### Step 1: Clone the Repository

```bash
git clone https://github.com/JoeMingT/EyeSee.git
# or
git clone git@github.com:JoeMingT/EyeSee.git
```

##### Step 2: Download dependencies

```bash
# Install packages
cd Machine-Learning
npm i --force

# Install dependencies
cd ../Mobile-App
### If want to create virtual environment
# python -m venv .venv
# source .venv/bin/activate
pip install -r requirements

# Return to Root Folder
cd ..
```

##### Step 3: Starting the Machine Learning Server

```bash
cd Machine-Learning
python main.py
```

The server will **start in your laptop/desktop device's port 8000**. Meaning `localhost:8000`.

##### Step 4: Starting the Mobile Application Server

```bash
cd Mobile-App
npm run start
```

The **server will start and a QR code will be presented**. Make sure that you **did not switch off the Machine Learning Server** from Step 3, you'll need **both running simultaneously** for the application to work properly.

#### Method 1: Running on your own Mobile Device

There are 2 ways to run the mobile application, this is one of the methods. In this section, I'll guide you through on **how to run the application on your mobile device**.

##### Step 5.1: Connect to the Same Network

Ensure that **both your laptop/desktop device are connected to the same network (Wifi, Hotspot) as your mobile phone**.

##### Step 5.2: Configure Some settings

There are **two lines within the codebase that requires manual tweaking** due to how the code functions. The changes are required to be done in the following files:
- `./Mobile-App/screens/TakePictureScreen.tsx`
- `./Mobile-App/screens/UploadFilesScreen.tsx`

There is a **line within both files** that is as follows (the **IP may differ** from the example but it should look something as shown): 
- `const imgCaptionUrl = 'http://192.168.16.15:8000/captions';`

You are required to **change the IP above to your laptop/desktop device's local IPv4**. This is due to the fact that your MOBILE PHONE is a different device and is not LOCAL HOST, meaning it'll need your laptop/desktop device's IP to reach the servers you have spun up in there.

You may **obtain your devices IPv4 typing the command line** below. A full guide can be seen [here](https://www.whatismybrowser.com/detect/what-is-my-local-ip-address/)

```bash
# Get IP address only, not IPv6
# Windows
ipconfig
# Linux
ip address
```

For example, if my IPv4 is `194.164.222.11`, I will configure the line to:
- `const imgCaptionUrl = 'http://194.164.222.11:8000/captions'`

##### Step 5.3: Download the Required .apk FIles

Finally, you are required to **download the Expo Go version that is appropriate to the version of Expo that is running**. Unfortunately, you could not use the latest version of Expo Go published in the App Store as the codebase is outdated. Instead you are **required to download the older version of the app in `.apk` format and install the app** that way. The download link can be obtained [here](https://expo.dev/go?sdkVersion=51&platform=android&device=true).

##### Step 5.4: Running the Mobile Application On Your Mobile Phone

Once you have **installed the application, launch it, and scan the QR code** using the application. And congratulations! The mobile application is now running on your phone!

#### Method 2: Running on an Android Simulator

There are 2 ways to run the mobile application, this is one of the methods. Through this method, you will be **running the mobile application through an Android Simulator**, installed and configured **from Android Studio**.

##### Step 6.1: Install Android Studio.

**Download and install Android Studio** on your device. The download link for Android Studio is [here](https://developer.android.com/studio).

##### Step 6.2: Install the Android Emulator

**Download and install an Android Emulator** of your choice. It could an emulator for any devices that you prefer. A full guide and instruction on how to download and install the emulator can be seen [here](https://developer.android.com/studio/run/emulator).
 
A full guide made by Expo can be seen [here](https://docs.expo.dev/workflow/android-studio-emulator/).

##### Step 6.3: Configure some settings.

There are **two lines within the codebase that requires manual tweaking** due to how the code functions. The changes are required to be done in the following files:
- `/Mobile-App/screens/TakePictureScreen.tsx`
- `/Mobile-App/screens/UploadFilesScreen.tsx`

There is a **line within both files** that is as follows (the **IP may differ from the example** shown but it should look something as shown): 
- `const imgCaptionUrl = 'http://192.168.16.15:8000/captions';`

You are **required to change the IP address** within it to `localhost` or `0.0.0.0`. Either one works.
- `const imgCaptionUrl = 'http://localhost:8000/captions';`

As you are running the whole thing locally within a single device, you may use `localhost` for your url.

##### Step 6.4: Run the Application

In Expo, it can **automatically detect an Android emulator** as long as it is currently running. **Return to Expo's server (with the QR code) and press `a`** which will build the application in your Android emulator automatically. A guide made by Expo can be seen [here](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated#install-expo-go).

<br>

