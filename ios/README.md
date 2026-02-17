# iOS Wrapper for Master Abacus Academy

This directory contains the Objective-C source code for an iOS wrapper that runs the Master Abacus Academy web application.

## Prerequisites

- Xcode (latest version recommended)
- CocoaPods (if you choose to use third-party libraries, though this project is dependency-free)

## Setup

1.  **Build the Web App**:
    From the root of the repository, run:
    ```bash
    npm run build
    ```
    This will create a `dist` directory with the bundled files.

2.  **Create Xcode Project**:
    - Open Xcode.
    - Create a new project -> select "App" under iOS.
    - Choose "Objective-C" as the language.
    - Name it "MasterAbacusAcademy".
    - Organization Identifier: `com.example` (or your own).

3.  **Replace Source Files**:
    - Replace the generated `main.m`, `AppDelegate.h`, `AppDelegate.m`, `ViewController.h`, `ViewController.m` with the files in this directory.
    - Or simply drag and drop the files from this directory into your Xcode project (make sure to select "Copy items if needed").

4.  **Add Web Assets**:
    - Locate the `dist` folder generated in step 1.
    - Rename it to `www`.
    - Drag the `www` folder into your Xcode project navigator.
    - **Important**: In the dialog that appears, select **"Create folder references"** (not "Create groups"). This ensures the folder structure is preserved in the app bundle.

5.  **Run**:
    - Select a simulator or device.
    - Press Run (Cmd+R).

## Notes on SQLite WASM

The app uses `sqlite-wasm` which relies on `SharedArrayBuffer` and specific HTTP headers (`Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy`).
This iOS wrapper implements a custom `WKURLSchemeHandler` to serve the local files with these headers.
However, due to WebKit restrictions on custom schemes, `SharedArrayBuffer` support might be limited.
If persistence fails, the app might fallback to transient storage.
