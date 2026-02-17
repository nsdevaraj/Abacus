#import "ViewController.h"
#import <MobileCoreServices/MobileCoreServices.h>

@interface AppSchemeHandler : NSObject <WKURLSchemeHandler>
@end

@implementation AppSchemeHandler

- (void)webView:(WKWebView *)webView startURLSchemeTask:(id<WKURLSchemeTask>)urlSchemeTask {
    NSURL *url = urlSchemeTask.request.URL;
    NSString *path = url.path;

    // Default to index.html for root
    if (path.length == 0 || [path isEqualToString:@"/"]) {
        path = @"/index.html";
    }

    // Map request to the 'www' directory in the bundle
    NSString *resourcePath = [[NSBundle mainBundle] resourcePath];
    NSString *filePath = [NSString stringWithFormat:@"%@/www%@", resourcePath, path];

    NSFileManager *fileManager = [NSFileManager defaultManager];

    if ([fileManager fileExistsAtPath:filePath]) {
        NSData *data = [NSData dataWithContentsOfFile:filePath];
        NSString *mimeType = [self mimeTypeForPath:filePath];

        // Critical headers for SharedArrayBuffer support required by sqlite-wasm
        NSDictionary *headers = @{
            @"Content-Type": mimeType,
            @"Cross-Origin-Opener-Policy": @"same-origin",
            @"Cross-Origin-Embedder-Policy": @"require-corp",
            @"Access-Control-Allow-Origin": @"*"
        };

        NSHTTPURLResponse *response = [[NSHTTPURLResponse alloc] initWithURL:url
                                                                  statusCode:200
                                                                 HTTPVersion:@"HTTP/1.1"
                                                                headerFields:headers];

        [urlSchemeTask didReceiveResponse:response];
        [urlSchemeTask didReceiveData:data];
        [urlSchemeTask didFinish];
    } else {
        // File not found
        // For SPA routing, you might want to serve index.html here if it's a navigation request.
        // But for asset requests, we should return 404.
        // Since this app uses state-based routing, we return 404 for missing files.
        NSError *error = [NSError errorWithDomain:NSURLErrorDomain code:NSURLErrorFileDoesNotExist userInfo:nil];
        [urlSchemeTask didFailWithError:error];
    }
}

- (void)webView:(WKWebView *)webView stopURLSchemeTask:(id<WKURLSchemeTask>)urlSchemeTask {
    // Handle stop if needed
}

- (NSString *)mimeTypeForPath:(NSString *)path {
    NSString *extension = [path pathExtension].lowercaseString;

    if ([extension isEqualToString:@"html"]) return @"text/html";
    if ([extension isEqualToString:@"js"]) return @"application/javascript";
    if ([extension isEqualToString:@"css"]) return @"text/css";
    if ([extension isEqualToString:@"png"]) return @"image/png";
    if ([extension isEqualToString:@"jpg"] || [extension isEqualToString:@"jpeg"]) return @"image/jpeg";
    if ([extension isEqualToString:@"svg"]) return @"image/svg+xml";
    if ([extension isEqualToString:@"json"]) return @"application/json";
    if ([extension isEqualToString:@"wasm"]) return @"application/wasm";
    if ([extension isEqualToString:@"ico"]) return @"image/x-icon";

    return @"application/octet-stream";
}

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];

    // Register the custom scheme handler
    [config setURLSchemeHandler:[[AppSchemeHandler alloc] init] forURLScheme:@"app"];

    // Allow media playback without user gesture
    config.mediaTypesRequiringUserActionForPlayback = WKAudiovisualMediaTypeNone;

    // Allow inline media playback
    config.allowsInlineMediaPlayback = YES;

    self.webView = [[WKWebView alloc] initWithFrame:self.view.bounds configuration:config];
    self.webView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    self.webView.navigationDelegate = self;
    self.webView.UIDelegate = self;

    // Set background color to match app theme (sky-50 approx #f0f9ff)
    self.webView.scrollView.backgroundColor = [UIColor colorWithRed:0.94 green:0.98 blue:1.0 alpha:1.0];

    [self.view addSubview:self.webView];

    // Load the local app via the custom scheme
    NSURL *url = [NSURL URLWithString:@"app://localhost/index.html"];
    [self.webView loadRequest:[NSURLRequest requestWithURL:url]];
}

// Handle alert() calls from JS
- (void)webView:(WKWebView *)webView runJavaScriptAlertPanelWithMessage:(NSString *)message initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(void))completionHandler {
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:nil message:message preferredStyle:UIAlertControllerStyleAlert];
    [alert addAction:[UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:^(UIAlertAction *action) {
        completionHandler();
    }]];
    [self presentViewController:alert animated:YES completion:nil];
}

// Handle confirm() calls from JS
- (void)webView:(WKWebView *)webView runJavaScriptConfirmPanelWithMessage:(NSString *)message initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(BOOL result))completionHandler {
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:nil message:message preferredStyle:UIAlertControllerStyleAlert];
    [alert addAction:[UIAlertAction actionWithTitle:@"Cancel" style:UIAlertActionStyleCancel handler:^(UIAlertAction *action) {
        completionHandler(NO);
    }]];
    [alert addAction:[UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:^(UIAlertAction *action) {
        completionHandler(YES);
    }]];
    [self presentViewController:alert animated:YES completion:nil];
}

@end
